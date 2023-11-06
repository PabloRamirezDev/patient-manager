"use client";

import { Loader } from "@/app/components/Loader";
import { Patient } from "@/app/types/Patient";
import useSWR from "swr";
import { PatientCard } from "./PatientCard";
import { AddPatientCard } from "./AddPatientCard";
import axios, { AxiosResponse } from "axios";

export const PatientsList = () => {
  const { data, isLoading } = useSWR<AxiosResponse<Patient[]>>(
    "/api/patients",
    axios
  );

  const patients = data?.data ?? [];

  if (isLoading) return <Loader />;

  return (
    <ul className="flex flex-col gap-4">
      {patients.map((patient, i) => (
        <li key={patient.id}>
          <PatientCard index={i} patient={patient} />
        </li>
      ))}
      <li key="add">
        <AddPatientCard index={patients.length} />
      </li>
    </ul>
  );
};
