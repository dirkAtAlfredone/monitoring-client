import Image from "next/image";
import logo from "../../public/alfredone-logo.png"
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Host } from "@/models/host";
import Cards from "@/components/ui/cards";

export default function Home() {

  const hosts: Host[] = [];

  return (
    <>
      <header className="relative bg-company-orange w-[1280] h-[80] m-auto rounded-xl mt-[35] text-right">
        <span className="absolute block p-[5] bg-white rounded-xl top-[-15] border-[5] border-company-orange">
          <Image className="bg-white" src={logo} alt="alfredone logo" width={90} height={90} />
        </span>
        <Button asChild>
          <Link className="relative block border border-white border-2 text-white top-[22] right-[40] hover:bg-white hover:text-company-orange" href={"#"}>
            <Plus strokeWidth={4} />
            Add Address
          </Link>
        </Button>
      </header>
      <Cards hosts={hosts}/>
    </>
  );
}