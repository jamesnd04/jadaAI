"use server";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function Header() {
  const AiLogo = () => {
    return (
      <div>
        <Image src={"/ai-logo.png"} alt="Lauryn Logo" width={50} height={50} />
      </div>
    );
  };

  return (
    <>
      <div className="flex w-full justify-center items-center sticky top-0 z-50 h-20 bg-grey shadow-md">
        <div className="flex items-center gap-2">
          <AiLogo />
          <p className="text-2xl font-semibold">JadaAI</p>
        </div>
      </div>
    </>
  );
}
