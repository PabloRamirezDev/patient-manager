import { Card } from "@/app/components/Card";
import Link from "next/link";
import { CSSProperties, FC } from "react";
import { ADD_MODAL_ID } from "./AddPatientModal";

interface Props {
  // openModal: () => void;
  index?: number;
}

export const AddPatientCard: FC<Props> = (props) => {
  const { index = 0 } = props;

  // const [loaded, setLoaded] = useState(false);

  // const handleLoad = useCallback(() => {
  //   setLoaded(true);
  // }, []);

  return (
    <Link
      className="hover:opacity-50 duration-300 w-full active:opacity-80"
      href={`?${ADD_MODAL_ID}=true`}
    >
      <Card
        className="flex items-center justify-center text-xl text-sky-300/75 font-semibold min-h-[150px] delay-cascade animate-fade-in !bg-transparent !shadow-none border-8 border-dashed border-sky-300/75"
        style={{ "--i": index } as CSSProperties}
      >
        Add Patient
      </Card>
    </Link>
  );
};
