import { INode, INodeNet } from "@/models/proxmox";
import { Button } from "../shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/card";
import { Separator } from "../shadcn/separator";
import { Tooltip, TooltipTrigger } from "../shadcn/tooltip";
import axios from "axios";
import Status from "./status";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function NodeCard({server}: {server: INode}){

  const {data} = await axios.get<INodeNet[]>(`${URI}/api/v1/resources/dns/${server.id}`);

  return (
    <>
    <Card className="relative w-[21.125rem] shadow-card border border-[#DDE9E7] pb-2">
              <CardHeader className="gap-0">
                <CardTitle className="text-xl/[1.2] font-bold">{server.node.toUpperCase()}</CardTitle>
                <CardDescription className="text-xs/[1.4] text-[#4C5C59]">
                  <ul>
                    {
                      data.map(ip => {
                        return (
                          <li key={ip.address}>
                            {ip.address}
                          </li>
                        );
                      })
                    }
                  </ul>
                </CardDescription>
                <Status status={server.status} id={server.id} />
                <Separator className="bg-[#DDE9E7] mt-2" />
              </CardHeader>
              <CardContent>

              </CardContent>
              <Separator className="bg-[#DDE9E7]" />
              {/* <CardFooter className="justify-end gap-2 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-white hover:bg-hover-orange hover:border-hover-orange rounded-full h-fit p-1.5 border border-[#DDE9E7]">
                      <Image src={edit} alt="edit icon" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Info</p>
                  </TooltipContent>
                </Tooltip>
                <DeleteButton host={host} />
              </CardFooter> */}
            </Card>
    </>
  );
}