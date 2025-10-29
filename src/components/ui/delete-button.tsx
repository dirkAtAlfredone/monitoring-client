"use client";

import { Button } from "../shadcn/button";
import trash from "../../../public/icons/trash-03.svg";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/dialog";
import { IHost } from "@/models/host";
import axios from "axios";
import { revalidateRoute } from "@/actions/navigate";

const URI = process.env.NEXT_PUBLIC_URI;

export default function DeleteButton({ host }: { host: IHost }) {

  const handleDelete = async () => {
    console.log(`${URI}/api/v1/address/delete`);
    const { status } = await axios.post(`${URI}/api/v1/address/delete`, {id: host.id});
    if(status === 204){
      revalidateRoute("/");
    }
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white hover:bg-red-200 hover:border-red-200 border border-[#DDE9E7] h-fit rounded-full p-1.5">
                <Image src={trash} alt="trash icon" />
              </Button>
            </DialogTrigger>
            <DialogContent className="shadow-xs gap-0">
              <DialogHeader>
                <DialogTitle className="text-2xl/[1.4] font-bold">
                  {`Delete ${host.name}`}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm/[1.5] font-medium tracking-[0.14px]">
                  {`Are you sure you want to delete ${host.name}?`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 gap-4">
                <DialogClose asChild>
                  <Button className="rounded-md border text-black border-[#C0CFCC] px-4.5 py-3 bg-white">Cancel</Button>
                </DialogClose>
                <Button className="bg-[#CB0A04] rounded-md" onClick={handleDelete}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>

    </>
  );
}