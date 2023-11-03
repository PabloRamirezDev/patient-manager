import axios, { AxiosResponse } from "axios";
import { PropsWithChildren, createContext, useCallback, useMemo } from "react";
import useSWR from "swr";
import { Patient } from "../types/Patient";

interface PatientsContext {
  patients: Patient[];
  isLoading: boolean;
  error: any;
  onAdd: (patient: Patient) => void;
}

const initial: PatientsContext = {
  patients: [],
  isLoading: true,
  error: null,
  onAdd: () => {},
};

export const PatientsContext = createContext(initial);

export const PatientsContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { data, isLoading, error, mutate } = useSWR<AxiosResponse<Patient[]>>(
    "/api/patients",
    axios
  );

  const patients = useMemo(() => data?.data ?? [], [data]);

  const onAdd = useCallback(
    (patient: Patient) => {
      if (!data) return;

      mutate({ ...data, data: [...patients, patient] });
    },
    [mutate, data, patients]
  );

  const value = {
    patients,
    isLoading,
    error,
    onAdd,
  };

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
};
