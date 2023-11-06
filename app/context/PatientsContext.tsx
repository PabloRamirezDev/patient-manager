'use client';

import axios, { AxiosResponse } from "axios";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  // @ts-expect-error
  experimental_useOptimistic as useOptimistic,
  useState,
} from "react";
import useSWR from "swr";
import { Patient } from "../types/Patient";
import { addPatient as addPatientAction } from "../actions/add-patient";
import { PatientFormData } from "../types/PatientFormData";
import { ValidatorResult } from "../lib/validators";
import { getFormData } from "../lib/utils";

interface PatientsContext {
  patients: Patient[];
  isLoading: boolean;
  error: any;
  addPatient: (patient: Patient) => void;
  addPatientResult: ValidatorResult<PatientFormData> | null;
}

const initial: PatientsContext = {
  patients: [],
  isLoading: true,
  error: null,
  addPatient: () => {},
  addPatientResult: null,
};

export const PatientsContext = createContext(initial);

export const PatientsContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { data, isLoading, error } = useSWR<AxiosResponse<Patient[]>>(
    "/api/patients",
    axios
  );

  const [patients, setPatients] = useState<Patient[]>(
    JSON.parse(localStorage.getItem("patients") ?? "[]")
  );

  useEffect(() => {
    if (data?.data) setPatients(data.data);
  }, [data]);

  const [addPatientResult, setAddPatientResult] =
    useState<ValidatorResult<PatientFormData> | null>(null);

  const addPatient = useCallback(
    async (patient: Patient) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        const optimisticPatients = [
          ...patients,
          {
            ...patient,
            id_photo: e.target?.result as string,
          },
        ];
        setPatients(optimisticPatients);
        localStorage.setItem("patients", JSON.stringify(optimisticPatients));
      });
      reader.readAsDataURL(patient.id_photo as unknown as Blob);

      const formData = getFormData(patient);

      const result = await addPatientAction(formData);
      setAddPatientResult(result as ValidatorResult<PatientFormData>);
    },
    [setAddPatientResult, patients]
  );

  const value = {
    patients,
    isLoading,
    error,
    addPatient,
    addPatientResult,
  };

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
};
