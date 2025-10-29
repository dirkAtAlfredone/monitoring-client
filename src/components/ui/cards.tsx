import { INode, INodeNet, IVM, IVMNet } from "@/models/proxmox";
import NodeCard from "./node-card";
import axios from "axios";
import VMCard from "./vm-card";

const URI = process.env.NEXT_PUBLIC_URI;

export default async function Cards({ data }: { data: { servers: INode[], vms: IVM[] } }) {

  const { servers, vms } = data;

  return (
    <main className="flex flex-wrap max-w-[1280px] m-auto mt-[40] justify-center gap-8 pb-16">
      {
        servers.map(async (server) => {
          const { data } = await axios.get<INodeNet[]>(`${URI}/api/v1/resources/ip/${server.id}`);
          return <NodeCard key={server.id} server={server} network={data} />
        }
        )
      }
      {
        vms.map(async (vm) => {
          let network: IVMNet[] = [];
          try {
            const { data } = await axios.get<IVMNet[]>(`${URI}/api/v1/resources/ip/vm/${vm.node}/${vm.vmid}`);
            network = [...data];
          } catch (e) {
            // console.log(e);
          }
          return <VMCard key={vm.id} server={vm} network={network} />
        })
      }
    </main>
  );
}