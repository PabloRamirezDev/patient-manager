import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="absolute bg-sky-200 p-6 flex flex-row justify-center z-10 w-full top-0 shadow-sm">
      <div className="w-full max-w-[800px]">
        <h1 className="font-black tracking-tight text-4xl">
          Patient Manager
        </h1>
      </div>
    </header>
  );
};
