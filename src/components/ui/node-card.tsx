import { INode, INodeNet } from "@/models/proxmox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import ServerStatus from "./server-status";
import { Badge } from "../shadcn/badge";
import { getContrastingTextColor, getRandomColor } from "@/lib/colors";

export default async function NodeCard({ server, network }: { server: INode, network: INodeNet[] }) {

  return (
    <a className="" href={`https://${network[0].address}:8006`} target="_blank">
      <Card className="relative w-[21.125rem] shadow-card border border-[#DDE9E7] pb-2">
        <CardHeader className="gap-0">
          <CardTitle className="text-xl/[1.2] font-bold">{server.node.toUpperCase()}</CardTitle>
          <CardDescription className="text-xs/[1.4] text-[#4C5C59]">
            <ul>
              {
                network.map(ip => {
                  return (
                    <li key={ip.address}>
                      {ip.address}
                    </li>
                  );
                })
              }
            </ul>
            <ul className="flex gap-0.5 pt-2">
              {
                server.tags.map(tag => {
                  const bg = getRandomColor();
                  const textColor = getContrastingTextColor(bg);
                  return (
                    <li key={tag}>
                      <Badge className="px-1 py-[1px] text-[10px]/[1.4]" style={{ backgroundColor: bg, color: textColor }}>
                        {tag.toLowerCase()}
                      </Badge>
                    </li>
                  )
                })
              }
            </ul>
          </CardDescription>
          <ServerStatus status={server.status} id={server.id} />
        </CardHeader>
        <CardContent className="mt-2">

        </CardContent>
        <Separator className="bg-[#DDE9E7]" />
        <CardFooter className="justify-start gap-0.5 pt-2 text-[11px] text-[#c3bfbc] tracking-tighter">
          {`https://${network[0].address}:8006`}
        </CardFooter>
      </Card>
    </a>
  );
}