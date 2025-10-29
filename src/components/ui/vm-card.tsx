import { INodeNet, IVM, IVMNet } from "@/models/proxmox";
import { Badge } from "../shadcn/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import { getContrastingTextColor, getRandomColor } from "@/lib/colors";
import VMStatus from "./vm-status";

export default function VMCard({server, network}: {server: IVM, network: IVMNet[]}) {
  const addresses = network.reduce<string[]>((previous, current) => {
    return previous.concat(current.addresses);
  }, []);
  return (
    <Card className="relative w-[21.125rem] shadow-card border border-[#DDE9E7] pb-2">
      <CardHeader className="gap-0">
        <CardTitle className="text-xl/[1.2] font-bold">{server.name}</CardTitle>
        <CardDescription className="text-xs/[1.4] text-[#4C5C59]">
          <ul>
            { !!addresses.length ?
              addresses.map(ip => {
                return (
                  <li key={ip}>
                    {ip}
                  </li>
                );
              }) : <p>QEMU guest agent not enabled</p>
            }
          </ul>
          <ul className="flex gap-0.5 pt-2">
            {
              server.tags.map(tag => {
                const bg = getRandomColor();
                return (
                  <li key={tag}>
                    <Badge className="px-1 py-[1px] text-[10px]/[1.4] text-white" style={{ backgroundColor: bg }}>
                      {tag.toLowerCase()}
                    </Badge>
                  </li>
                )
              })
            }
          </ul>
        </CardDescription>
        <VMStatus status={server.status} id={server.id} node={server.node} />
      </CardHeader>
      <CardContent className="mt-2">

      </CardContent>
      <Separator className="bg-[#DDE9E7]" />
      <CardFooter className="justify-start gap-0.5 pt-2 text-[11px] text-[#c3bfbc] tracking-tighter">
    
      </CardFooter>
    </Card>
  );
}