"use client";

import { FormButton } from "@/app/components/FormButton";
import { Input } from "@/app/components/Input";
import { PatientsContext } from "@/app/context/PatientsContext";
import { ValidationError, validatePatient } from "@/app/lib/validators";
import { Patient } from "@/app/types/Patient";
import { PatientFormData } from "@/app/types/PatientFormData";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const inputs = [
  { label: "Name", type: "text", name: "name", required: true },
  { label: "Email", type: "email", name: "email", required: true },
  { label: "Phone Number", type: "tel", name: "phone", required: true },
  {
    label: "Document/ID Photo",
    type: "file",
    name: "id_photo",
    accept: "image/jpg",
    required: true,
  },
];

const initialState = {
  valid: false,
  errors: [] as ValidationError<PatientFormData>[],
};

export const AddPatientForm: FC = () => {
  const { addPatient, addPatientResult: serverValidationResult } =
    useContext(PatientsContext);

  const [clientValidationResult, setClientValidationResult] =
    useState(initialState);

  const validationResult = useMemo(() => {
    if (clientValidationResult.valid) return serverValidationResult;

    return clientValidationResult;
  }, [clientValidationResult, serverValidationResult]);

  const [patient, setPatient] = useState<PatientFormData>({
    email: "",
    id_photo: null,
    name: "",
    phone: "",
  });

  const { errors } = validationResult || {};

  const generalError = errors?.find((e) => e.field === "general");

  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setClientValidationResult(initialState);
      const validationResult = validatePatient(patient);

      if (!validationResult.valid) {
        setClientValidationResult(validationResult);
        return;
      }

      addPatient(patient as Patient);
      router.push("?");
    },
    [patient, addPatient, router]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setPatient({ ...patient, [e.target.name]: e.target.files.item(0) });
        return;
      }

      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
      });
    },
    [patient]
  );

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {inputs.map((input) => {
        const { name } = input;

        const error = errors?.find((e) => e.field === name);

        return (
          <Input
            key={name}
            error={error?.message}
            onChange={handleChange}
            {...input}
          />
        );
      })}
      <FormButton text="Submit" type="submit" />
      <span className="h-[0.75rem]">
        {generalError && (
          <div className="text-xs leading-3 animate-shake-x text-red-400 text-center">
            {generalError.message}
          </div>
        )}
      </span>
    </form>
  );
};
