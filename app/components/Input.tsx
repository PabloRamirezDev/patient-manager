import {
  ChangeEvent,
  DragEvent,
  HTMLProps,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  //@ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  accept?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { name, label, error, type } = props;

  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm text-slate-400 uppercase font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "file" ? <FileInput {...props} /> : <GenericInput {...props} />}
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

const GenericInput = (props: InputProps) => {
  const { name, ...rest } = props;
  return (
    <input className="border rounded-md p-2" id={name} name={name} {...rest} />
  );
};

const FileInput = (props: InputProps) => {
  const { name, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        className={`file:hidden border rounded-md p-2 duration-300 cursor-pointer hover:bg-sky-100 ${
          inputRef.current?.files?.length ?? 0 > 0
            ? ""
            : "bg-sky-200 text-transparent before:content-['Drop_or_Select_an_image_here'] before:cursor-pointer before:text-slate-800 before:text-center before:font-semibold"
        }`}
        id={name}
        name={name}
        {...rest}
      />
    </>
  );
};
