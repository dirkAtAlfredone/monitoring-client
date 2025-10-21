import Image from "next/image";
import logo from "../../public/alfredone-logo.png"
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Cards from "@/components/ui/cards";
import axios from "axios";
import { notFound } from "next/navigation";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Home() {

  try {
    const {data: hosts} = await axios.get(`${URI}/api/v1/address`);
    
    return (
      <>
        <header className="relative bg-company-orange sm:w-[93.75%] max-w-[1280px] h-[80] m-auto rounded-xl mt-[35] text-right">
          <span className="absolute block p-[5] bg-white rounded-xl top-[-15] border-[5] border-company-orange">
            <Image className="bg-white" src={logo} alt="alfredone logo" width={90} height={90} priority />
          </span>
          <Button className="bg-company-orange" asChild>
            <Link className="relative block border-white border-4 p-2 rounded-xl text-company-orange hover:bg-white hover:text-company-orange mt-0 right-5 top-4.5" href={"/add"}>
              <Plus strokeWidth={4} />
              Add Address
            </Link>
          </Button>
        </header>
        <Cards hosts={hosts}/>
      </>
    );
  } catch (e) {
    console.log(e)
    notFound();
  }
}