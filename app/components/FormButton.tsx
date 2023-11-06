import { ButtonHTMLAttributes, FC } from "react";
import {
  //@ts-expect-error
  experimental_useFormStatus as useFormStatus,
} from "react-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { text: string };

export const FormButton: FC<Props> = (props) => {
  const { type, className, disabled, text, ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      className={`p-4 bg-sky-200 rounded-md hover:bg-sky-200/50 active:bg-sky-400/80 duration-300 mt-6 ${
        pending ? "animate-pulse" : ""
      } ${className}`}
      disabled={pending || disabled}
      {...rest}
    >
      {text}
    </button>
  );
};
