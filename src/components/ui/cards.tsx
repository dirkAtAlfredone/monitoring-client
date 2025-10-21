import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { IHost } from "@/models/host";
import Status from "./status";
import { Separator } from "../shadcn/separator";
import edit from "../../../public/icons/edit-05.svg";
import { Button } from "../shadcn/button";
import Image from "next/image";
import DeleteButton from "./delete-button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../shadcn/tooltip";

export default function Cards({ hosts }: { hosts: IHost[] }) {

  return (
    <main className="flex flex-wrap max-w-[1280px] m-auto mt-[40] justify-center gap-8">
      {
        hosts.map(host => {
          return (
            <Card className="relative w-[21.125rem] shadow-card border border-[#DDE9E7] pb-2" key={host.id}>
              <CardHeader className="gap-0">
                <CardTitle className="text-xl/[1.2] font-bold">{host.name}</CardTitle>
                <CardDescription className="text-xs/[1.4] text-[#4C5C59]">{host.ip}</CardDescription>
                <Status host={host} />
                <Separator className="bg-[#DDE9E7] mt-2" />
              </CardHeader>
              <CardContent>

              </CardContent>
              <Separator className="bg-[#DDE9E7]" />
              <CardFooter className="justify-end gap-2 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-white hover:bg-hover-orange hover:border-hover-orange">
                      <Image src={edit} alt="edit icon" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Info</p>
                  </TooltipContent>
                </Tooltip>
                <DeleteButton />
              </CardFooter>
            </Card>
          )
        })
      }
    </main>
  );
}