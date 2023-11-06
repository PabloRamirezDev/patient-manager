import {
  ChangeEvent,
  DragEvent,
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  //@ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  pre?: string;
}

export const Input = (props: InputProps) => {
  const { name, label, error, type } = props;

  const { pending } = useFormStatus();

  if (type === "tel") return <TelInput {...props} />;

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
  const { name, pre, ...rest } = props;
  return (
    <div className="flex flex-row">
      {pre && (
        <div className="text-lg font-semibold border-y border-l rounded-l-md px-2 flex flex-row items-center bg-slate-50">
          {pre}
        </div>
      )}
      <input
        className={`${
          pre ? "rounded-r-md" : "rounded-md"
        } border w-full p-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
};

const FileInput = (props: InputProps) => {
  const { name, className, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        className={`file:hidden border rounded-md p-2 duration-300 cursor-pointer hover:bg-sky-100 ${
          inputRef.current?.files?.length ?? 0 > 0
            ? ""
            : "bg-sky-200 text-transparent before:content-['Drop_or_Select_an_image_here'] before:cursor-pointer before:text-slate-800 before:text-center before:font-semibold"
        } ${className}`}
        id={name}
        name={name}
        {...rest}
      />
    </>
  );
};

const TelInput = (props: InputProps) => {
  const { name, onChange } = props;

  const [val, setValue] = useState("");
  const [rawValue, setRawValue] = useState({
    code: "",
    number: "",
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRawValue({
        ...rawValue,
        [e.target.name.replace(`${name}-`, "")]: e.target.value,
      });
    },
    [setRawValue, rawValue, name]
  );

  useEffect(() => {
    setValue(`+${rawValue.code} ${rawValue.number}`);
  }, [rawValue]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    onChange?.({ target: inputRef.current } as any);
  }, [val, onChange]);

  return (
    <>
      <span className="text-sm text-slate-400 uppercase font-semibold">
        Phone
      </span>
      <div className="flex flex-row gap-4 items-stretch">
        <div className="w-1/4">
          <Input
            type="number"
            label="code"
            name={`${name}-code`}
            onChange={handleChange}
            pre="+"
          />
        </div>
        <div className="w-3/4">
          <Input
            type="number"
            label="number"
            name={`${name}-number`}
            onChange={handleChange}
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={val}
        hidden
        className="hidden"
      />
    </>
  );
};
