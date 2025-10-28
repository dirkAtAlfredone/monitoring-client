import { INode, INodeNet, IVM } from "@/models/proxmox";
import NodeCard from "./node-card";
import axios from "axios";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Cards({ data }: { data: { servers: INode[], vms: IVM[] } }) {

  const { servers, vms } = data;

  return (
    <main className="flex flex-wrap max-w-[1280px] m-auto mt-[40] justify-center gap-8 pb-16">
      {
        servers.map(async (server) => {  
          const {data} = await axios.get<INodeNet[]>(`${URI}/api/v1/resources/dns/${server.id}`);
          return <NodeCard key={server.id} server={server} network={data} />
        }
        )
      }
    </main>
  );
}