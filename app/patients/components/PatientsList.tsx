"use client";

import { Loader } from "@/app/components/Loader";
import { PatientCard } from "./PatientCard";
import { AddPatientCard } from "./AddPatientCard";
import { useContext } from "react";
import { PatientsContext } from "@/app/context/PatientsContext";

export const PatientsList = () => {
  const { patients, isLoading } = useContext(PatientsContext);

  if (isLoading) return <Loader />;

  return (
    <ul className="flex flex-col gap-4">
      {patients.map((patient, i) => {
        console.log(i);
        return (
          <li key={patient.id}>
            <PatientCard key={i} index={i} patient={patient} />
          </li>
        );
      })}
      <li key="add">
        <AddPatientCard key="add" index={patients.length} />
      </li>
    </ul>
  );
};
