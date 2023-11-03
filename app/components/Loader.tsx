export const Loader = () => {
  return (
    <div className="flex items-center justify-center inset-0 absolute">
      <div className="relative animate-spin rounded-full w-[60px] h-[60px] bg-sky-300 overflow-hidden">
        <div className="relative rounded-full w-[40px] h-[40px] bg-sky-100 top-[10px] left-[10px]"></div>
        <div className="relative w-[30px] h-[30px] bg-sky-100 right-[0px] bottom-[10px]"></div>
      </div>
    </div>
  );
};
