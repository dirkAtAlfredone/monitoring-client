import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import Modal from "@/components/ui/modal"

export default function Add(){
  return(
    <>
    <Modal>
      <form className="relative bg-white w-full h-full mm:w-[93.75%] mm:h-fit mm:top-[30%] mm:left-[50%] mm:-translate-1/2 px-6 py-4 rounded-xl max-w-[35rem] text-right">
        <h2 className="font-bold text-lg text-left">New Address</h2>
        <Label htmlFor="name" className="mt-3">Name:</Label>
        <Input id="name" type="text" className="mt-1 ring-company-orange focus:border-company-orange" placeholder="Server name, virtual machine, etc..." />
        <Label htmlFor="ip" className="mt-3">Ip Address:</Label>
        <Input id="ip" type="text" className="mt-1 ring-company-orange focus:border-company-orange"  placeholder="x.x.x.x" />
        <Label htmlFor="description" className="mt-3">Description:</Label>
        <Textarea id="description" className="mt-1 ring-company-orange focus:border-company-orange"/>
        <Button className="bg-company-orange text-white mt-6">Submit</Button>
      </form>
    </Modal>

    </>
  );
}