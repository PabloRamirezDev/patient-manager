import { PatientFormData } from "../types/PatientFormData";
import { letterOnlyRegex } from "./regex";

export interface ValidationError<T> {
  field: keyof T;
  message: string;
}

export interface ValidatorResult<T> {
  valid: boolean;
  errors: ValidationError<T>[];
}

export type Validator<T = unknown> = (obj: T) => ValidatorResult<T>;

/**
 * Precondition: inputs must already be formatted (trimmed, etc)
 * @param patient
 */
export const validatePatient: Validator<PatientFormData> = (patient) => {
  const { name, email, phone, id_photo } = patient;

  const errors: ValidationError<PatientFormData>[] = [];

  if (!name) {
    errors.push(getError("name", "Name is required."));
  }

  if (typeof name !== "string" || !letterOnlyRegex.test(name)) {
    errors.push(getError("name", "Name must only contain letters."));
  }

  if (!email) {
    errors.push(getError("email", "Email is required."));
  }

  if (typeof email !== "string" || !email.endsWith("@gmail.com")) {
    errors.push(getError("email", "Email must be @gmail.com."));
  }

  if (!phone) {
    errors.push(getError("phone", "Phone is required."));
  }

  if (!id_photo || !(id_photo instanceof File) || id_photo.size === 0) {
    errors.push(getError("id_photo", "ID Photo is required."));
  }

  if (!(id_photo instanceof File) || id_photo.type !== "image/jpeg") {
    errors.push(getError("id_photo", "ID Photo must be in .jpg format."));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getError = <T>(field: T, message: string) => ({ field, message });
