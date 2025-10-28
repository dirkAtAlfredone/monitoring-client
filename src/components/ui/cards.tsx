import { INode, IVM } from "@/models/proxmox";
import NodeCard from "./node-card";

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