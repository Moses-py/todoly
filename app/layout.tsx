import Modal from "@/components/modal/Modal";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trello | Task manager",
  description: "A task manager running on ChatGPT4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#F5F6F8] px-3 py-5 md:py-0 md:px-0`}
      >
        <Modal />
        {children}
      </body>
    </html>
  );
}
