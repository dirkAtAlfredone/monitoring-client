import { Button } from "@/components/shadcn/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Host } from "@/models/host";
import Link from "next/link";

export default function Cards({ hosts }: { hosts: Host[] }) {

  console.log(hosts);

  return (
    <main className="flex gap-[10] flex-wrap w-[1280] m-auto mt-[40] justify-between">
      {
        hosts.map(host => {
          return (
            <Card className="w-[30%] hover:cursor-pointer" key={host.name}>
              <CardHeader>
                <CardTitle>{host.name}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          )
        })
      }
    </main>
  );
}