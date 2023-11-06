"use server";

import { db } from "../lib/db";
import { getError, validatePatient } from "../lib/validators";
import { DBTables } from "../types/DBTables";
import { Patient } from "../types/Patient";
import { PatientFormData } from "../types/PatientFormData";
import { v4 } from "uuid";
import { ActionError } from "../lib/errors";
import { revalidatePath } from "next/cache";
import { Upload } from "@aws-sdk/lib-storage";
import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getMailer } from "../lib/mailer";

export async function addPatient(formData: FormData) {
  try {
    const patient: PatientFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      id_photo: formData.get("id_photo"),
    };

    console.log("start");

    const validationResult = validatePatient(patient as any);

    if (!validationResult.valid) {
      console.log("Patient is invalid.");
      return validationResult;
    }

    const buf = Buffer.from(await (patient.id_photo as File).arrayBuffer());
    // const uploadDir = path.join(process.cwd(), "public/uploads");
    const filename = `${Date.now()}_${patient.name}_id_photo.jpg`;

    const result: CompleteMultipartUploadCommandOutput = await new Upload({
      client: new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      }),
      params: {
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        ACL: "public-read",
        Body: buf,
      },
    }).done();

    console.log("Pic uploaded.");

    const formattedPatient = formatPatient(patient, result.Location!);

    try {
      await db.insert(formattedPatient).into(DBTables.patients);
    } catch (e: any) {
      if (e.code === "ER_DUP_ENTRY") {
        return getInvalidResponse("Patient already exists.");
      }
      throw new ActionError(
        "An error occurred creating the patient. Please try again later.",
        e
      );
    }

    console.log("Saved into db.");

    const mailer = getMailer();

    // Do not await to avoid blocking
    mailer.sendMail({
      from: "John Doe",
      to: patient.email as string,
      subject: "Hi!",
      text: "Thank you for joining!",
      html: "<b>Thank you for joining!</b>",
    });

    console.log("Email sent.");

    revalidatePath("/patients");

    return validationResult;
  } catch (error: any) {
    console.log(error);
    if (error instanceof ActionError) {
      return getInvalidResponse(error.clientMessage);
    }

    return getInvalidResponse(
      "An unexpected error occurred. Please try again later."
    );
  }
}

const formatPatient = (
  rawPatient: PatientFormData,
  idPhotoLocation: string
): Patient => ({
  id: v4(),
  name: rawPatient.name as string,
  email: rawPatient.email as string,
  phone: rawPatient.phone as string,
  id_photo: idPhotoLocation,
});

const getInvalidResponse = (message: string) => ({
  valid: false,
  errors: [getError("general", message)],
});
