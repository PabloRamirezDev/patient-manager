import {
  CSSProperties,
  FC,
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  PropsWithChildren,
  forwardRef,
} from "react";

interface Props extends Omit<HTMLProps<HTMLDivElement>, "ref"> {
  className?: string;
  style?: CSSProperties;
}

const CardRender = (
  props: PropsWithChildren<Props>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={`${className} rounded-md border-slate-400 bg-white shadow-md p-8`}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
};

export const Card = forwardRef(CardRender);
