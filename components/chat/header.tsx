import { Button } from "../ui/button";
import Image from "next/image";

export default function Header(){

  const AiLogo = () =>  {
    return (
    <div>
      <Image src={"/ai-logo.png"}
      alt="Lauryn Logo"
      width={50}
      height={50}/>
    </div>)
  }

  return(
    <>
    <div className="flex flex-col sticky top-0 z-50 h-20 bg-grey shadow-md items-center justify-center">
      <AiLogo/>
      <p className="text-2xl">JadaAI</p>
    </div>
    </>
  )
}