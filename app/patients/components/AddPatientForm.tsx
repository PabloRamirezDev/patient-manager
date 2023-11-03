"use client";

import { addPatient } from "@/app/actions/add-patient";
import { PatientsContext } from "@/app/context/PatientsContext";
import { validatePatient } from "@/app/lib/validators";
import { Patient } from "@/app/types/Patient";
import { PatientFormData } from "@/app/types/PatientFormData";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  experimental_useFormState as useFormState,
  //@ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom";

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

interface Props {
  // onAdd: (patient: Patient) => void;
}

const initialState = {
  valid: false,
  errors: [],
};

interface InputProps {
  label: string;
  type: string;
  name: string;
  accept?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: InputProps) => {
  const { name, label, error, ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm text-slate-400 uppercase font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="border rounded-md p-2"
        id={name}
        name={name}
        {...rest}
      />
      <span className="h-[0.75rem]">
        {!pending && error && (
          <div className="text-xs leading-3 animate-shake-x text-red-400">
            {error}
          </div>
        )}
      </span>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`p-4 bg-sky-200 rounded-md hover:bg-sky-200/50 active:bg-sky-400/80 duration-300 mt-6 ${
        pending ? "animate-pulse" : ""
      }`}
      disabled={pending}
    >
      Submit
    </button>
  );
};

export const AddPatientForm: FC = () => {
  const { onAdd } = useContext(PatientsContext);

  const [serverValidationResult, formAction] = useFormState(
    addPatient,
    initialState
  );
  const [clientValidationResult, setClientValidationResult] =
    useState(initialState);

  const validationResult = useMemo(() => {
    if (clientValidationResult.valid) return serverValidationResult;

    return clientValidationResult;
  }, [clientValidationResult.valid, serverValidationResult.valid]);

  const [patient, setPatient] = useState<PatientFormData>({
    email: "",
    id_photo: null,
    name: "",
    phone: "",
  });

  const { errors } = serverValidationResult;

  const generalError = errors.find((e) => e.field === "general");

  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      const { valid, errors } = validatePatient(patient);

      if (!valid) {
        alert(errors.map((e) => e.message));
        e.preventDefault();
        return;
      }

      onAdd(patient as Patient);
    },
    [patient, onAdd]
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

  useEffect(() => {
    if (serverValidationResult.valid) {
      router.push("?");
    }
  }, [router, serverValidationResult.valid]);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit}
      action={formAction}
    >
      {inputs.map((input) => {
        const { name } = input;

        const error = errors.find((e) => e.field === name);

        return (
          <FormInput
            key={name}
            error={error?.message}
            onChange={handleChange}
            {...input}
          />
        );
      })}
      <SubmitButton />
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
