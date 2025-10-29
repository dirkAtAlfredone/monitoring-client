import { INode, INodeNet } from "@/models/proxmox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import ServerStatus from "./server-status";
import { Badge } from "../shadcn/badge";
import { getRandomColor } from "@/lib/colors";
import LinkTooltip from "./link-tooltip";
import edit from "../../../public/icons/edit-05.svg";
import Image from "next/image";
import link from "../../../public/icons/link.svg";

export default async function NodeCard({ server, network }: { server: INode, network: INodeNet[] }) {

  const href = `https://${network[0].address}:8006`;

  return (
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
        <ServerStatus status={server.status} id={server.id} />
      </CardHeader>
      <CardContent className="mt-2">

      </CardContent>
      <Separator className="bg-[#DDE9E7]" />
      <CardFooter className="gap-0.5 pt-2 text-[11px] text-[#c3bfbc] tracking-tighter justify-end">
        <LinkTooltip text={`Open ${href} in new tab`} link={href} target="_blank" >
            <Image src={link} alt="link icon" width={15} height={15} />
        </LinkTooltip>
        <LinkTooltip text={`Edit ${server.node.toUpperCase()}`}>
            <Image src={edit} alt="edit icon" height={16} width={16} />
        </LinkTooltip>
      </CardFooter>
    </Card>
  );
}