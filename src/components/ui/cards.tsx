import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { IHost } from "@/models/host";
import Status from "./status";
import { Separator } from "../shadcn/separator";

export default function Cards({ hosts }: { hosts: IHost[] }) {

  return (
    <main className="flex flex-wrap max-w-[1280px] m-auto mt-[40] justify-center gap-8">
      {
        hosts.map(host => {
          return (
            <Card className="relative w-[21.125rem] hover:cursor-pointer shadow-card border border-[#DDE9E7]" key={host.id}>
              <CardHeader className="gap-0">
                <CardTitle className="text-xl/[1.2] font-bold">{host.name}</CardTitle>
                <CardDescription className="text-xs/[1.4] text-[#4C5C59]">{host.ip}</CardDescription>
                <Separator className="bg-[#DDE9E7] mt-2"/>
              </CardHeader>
              <CardContent>

              </CardContent>
              <CardFooter>
                <Status host={host} />
              </CardFooter>
            </Card>
          )
        })
      }
    </main>
  );
}