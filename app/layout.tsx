import "./globals.css";
import { Header } from "./components/Header";
import { Montserrat } from "next/font/google";
import { Wrapper } from "./components/Wrapper";

const montserrat = Montserrat({ weight: "variable", subsets: ["latin"] });

export const metadata = {
  title: "Patient Manager",
  description: "Manage all your patients' data in a single place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`overflow-hidden text-slate-900 bg-slate-50 ${montserrat.className}`}>
        <Header />
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
