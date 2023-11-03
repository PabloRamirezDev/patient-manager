"use server";

import path from "path";
import { db } from "../lib/db";
import { getError, validatePatient } from "../lib/validators";
import { DBTables } from "../types/DBTables";
import { Patient } from "../types/Patient";
import { PatientFormData } from "../types/PatientFormData";
import fs from "fs/promises";
import { v4 } from "uuid";
import { ActionError } from "../lib/errors";
import { revalidatePath } from "next/cache";

export async function addPatient(prevState: any, formData: FormData) {
  try {
    await new Promise((r) => {
      setTimeout(r, 3000);
    })
    const patient: PatientFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      id_photo: formData.get("id_photo"),
    };

    const validationResult = validatePatient(patient as any);

    if (!validationResult.valid) return validationResult;

    const buf = Buffer.from(await (patient.id_photo as File).arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filename = `${Date.now()}_${patient.name}_id_photo.jpg`;

    try {
      await fs.stat(uploadDir);
    } catch (e: any) {
      if (e.code !== "ENOENT") {
        throw new ActionError(
          "An error occurred uploading the ID Photo. Please try again later.",
          e
        );
      }

      await fs.mkdir(uploadDir, { recursive: true });
    }

    try {
      await fs.writeFile(path.join(uploadDir, filename), buf);
    } catch (e: any) {
      throw new ActionError(
        "An error occurred uploading the ID Photo. Please try again later.",
        e
      );
    }

    const formattedPatient = formatPatient(patient, filename);

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

    revalidatePath('/patients');
    return validationResult;
  } catch (error: any) {
    console.error(error);
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
  idPhotoFilename: string
): Patient => ({
  id: v4(),
  name: rawPatient.name as string,
  email: rawPatient.email as string,
  phone: rawPatient.phone as string,
  id_photo: `/uploads/${idPhotoFilename}`,
});

const getInvalidResponse = (message: string) => ({
  valid: false,
  errors: [getError("general", message)],
});
