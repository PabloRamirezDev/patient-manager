"use client";

import { PatientsContextProvider } from "../context/PatientsContext";
import { AddPatientModal } from "./components/AddPatientModal";
import { PatientsList } from "./components/PatientsList";

interface Props {
  searchParams: Record<string, string> | null | undefined;
}

export default function Patients(props: Props) {
  const { searchParams } = props;

  return (
    <PatientsContextProvider>
      <h2 className="text-2xl font-semibold mb-8">My Patients</h2>
      <PatientsList />
      <AddPatientModal searchParams={searchParams} />
    </PatientsContextProvider>
  );
}
