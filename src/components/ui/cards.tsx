import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { IHost } from "@/models/host";
import Status from "./status";

export default function Cards({ hosts }: { hosts: IHost[] }) {

  return (
    <main className="flex gap-[10] flex-wrap sm:w-[93.75%] max-w-[1280px] m-auto mt-[40] justify-center">
      {
        hosts.map(host => {
          return (
            <Card className="relative w-[30%] hover:cursor-pointer" key={host.id}>
              <CardHeader>
                <CardTitle>{host.name}</CardTitle>
                <CardDescription>{host.ip}</CardDescription>
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