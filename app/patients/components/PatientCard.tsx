"use client";

import { FoldingCard } from "@/app/components/FoldingCard";
import { Patient } from "@/app/types/Patient";
import Image from "next/image";
import { CSSProperties, FC, useCallback, useMemo, useState } from "react";

interface Props {
  patient: Patient;
  index?: number;
}

export const PatientCard: FC<Props> = (props) => {
  const { patient, index = 0 } = props;

  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);
  console.log(patient.id_photo)
  return (
    <FoldingCard
      header={
        <div className="flex flex-row gap-10 justify-between items-center">
          <img
            className="rounded-md"
            src={patient.id_photo}
            alt={`${patient.name}'s id`}
            width={200}
            height={50}
            onLoad={handleLoad}
          />
          <span className="text-xl text-right">{patient.name}</span>
        </div>
      }
      body={
        <div className="flex flex-col gap-4 pb-4 px-4 text-right">
          <hr />
          <div>Email: {patient.email}</div>
          <div>Phone: {patient.phone}</div>
        </div>
      }
      loaded={loaded}
      className="delay-cascade animate-fade-in"
      style={{ "--i": index } as CSSProperties}
    />
  );
};
