import { FC, PropsWithChildren } from "react";

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center px-6 pt-44 sm:pt-32 pb-14 overflow-y-scroll">
      <main className="max-w-[800px] w-full h-fit">
        {children}
      </main>
    </div>
  );
};
