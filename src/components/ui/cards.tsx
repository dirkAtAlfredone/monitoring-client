import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { IHost } from "@/models/host";
import Status from "./status";
import { Separator } from "../shadcn/separator";
import edit from "../../../public/icons/edit-05.svg";
import { Button } from "../shadcn/button";
import Image from "next/image";
import DeleteButton from "./delete-button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../shadcn/tooltip";
import { INode, IVM } from "@/models/proxmox";
import NodeCard from "./NodeCard";

export default async function Cards({ data }: { data: { servers: INode[], vms: IVM[] } }) {

  const { servers, vms } = data;

  return (
    <main className="flex flex-wrap max-w-[1280px] m-auto mt-[40] justify-center gap-8 pb-16">
      {
        servers.map(server => {
          return <NodeCard key={server.id} server={server} />
        }
        )
      }
    </main>
  );
}