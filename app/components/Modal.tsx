"use client";

import Link from "next/link";
import {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useState,
} from "react";

interface Props {
  open: boolean;
  id: string;
}

const ModalRender: ForwardRefRenderFunction<
  HTMLDialogElement,
  PropsWithChildren<Props>
> = (props, ref) => {
  const { open, id, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      return;
    }

    const t = setTimeout(() => setIsOpen(false), 300);

    return () => clearTimeout(t);
  }, [open]);

  return (
    isOpen && (
      <>
        <dialog
          ref={ref}
          open={isOpen}
          className={`absolute inset-0 z-30 bg-transparent ${
            open ? "animate-grow" : "animate-shrink"
          }`}
        >
          {children}
        </dialog>
        <Link
          href="?"
          className={`absolute bg-gray-800/50 inset-0 z-20 cursor-default ${
            open ? "animate-fade-in" : "animate-fade-out"
          }`}
        />
      </>
    )
  );
};

export const Modal = forwardRef(ModalRender);
