"use client";

import { FC, HTMLProps, ReactNode, useEffect, useRef, useState } from "react";
import { Card } from "./Card";

interface Props extends HTMLProps<HTMLDivElement> {
  header: ReactNode;
  body: ReactNode;
  loaded?: boolean;
}

export const FoldingCard: FC<Props> = (props) => {
  const { header, body, loaded, className, style } = props;

  const [open, setOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const contentHeight = contentRef.current?.offsetHeight || 0;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      setElementHeight(open ? contentHeight + headerHeight : headerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, loaded]);

  return (
    <Card
      style={{
        ...style,
        height: elementHeight,
        boxSizing: "content-box",
      }}
      onClick={() => {
        setIsOpening(true);
        setOpen((v) => !v);
      }}
      className={`flex flex-col gap-8 duration-300 hover:bg-slate-100 active:bg-slate-200 cursor-pointer ${
        !open && isOpening ? "delay-300" : ""
      } ${className}`}
      ref={cardRef}
      onTransitionEnd={() => setIsOpening(false)}
    >
      <div ref={headerRef}>{header}</div>
      <div
        ref={contentRef}
        className={`duration-300 pb-4 ${open ? "delay-300" : "opacity-0"}`}
      >
        {body}
      </div>
    </Card>
  );
};
