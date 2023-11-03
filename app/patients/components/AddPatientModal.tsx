import { Card } from "@/app/components/Card";
import { Modal } from "@/app/components/Modal";
import Link from "next/link";
import { AddPatientForm } from "./AddPatientForm";
import { FC } from "react";

interface Props {
  searchParams: Record<string, string> | null | undefined;
}

export const ADD_MODAL_ID = "add";

export const AddPatientModal: FC<Props> = (props) => {
  const { searchParams } = props;

  return (
    <Modal open={searchParams?.[ADD_MODAL_ID] === "true"} id={ADD_MODAL_ID}>
      <Card className="flex flex-col gap-4">
        <header className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-semibold">Add Patient</h3>
          <Link
            href="?"
            className="font-black text-sky-400 scale-x-110 self-end p-2.5 leading-none rounded-full hover:bg-slate-200 active:bg-slate-300 duration-300"
          >
            X
          </Link>
        </header>
        <AddPatientForm />
      </Card>
    </Modal>
  );
};
