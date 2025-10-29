"use client";

import { revalidate } from "@/actions/navigate";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import Modal from "@/components/ui/modal";
import { IHost } from "@/models/host";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function Add() {

  const formRef = useRef<null | HTMLFormElement>(null);
  const router = useRouter();

  const onAddAddress = async (event: FormEvent) => {
    event.preventDefault();
    const hostname = (event.target as HTMLFormElement).hostname.value;
    const ip = (event.target as HTMLFormElement).ip.value;
    const description = (event.target as HTMLFormElement).description.value;

    const result = await revalidate<IHost>("/", {name: hostname, ip, description});

    if(result.success){
      router.back();
    }
  }

  return (
    <>
      <Modal>
        <form onClick={(e) => e.stopPropagation()} ref={formRef} onSubmit={onAddAddress} className="relative bg-white w-full h-full mm:w-[93.75%] mm:h-fit mm:top-[30%] mm:left-[50%] mm:-translate-1/2 px-6 py-4 rounded-xl max-w-[35rem] text-right">
          <h2 className="font-bold text-lg text-left">New Address</h2>
          <Label htmlFor="name" className="mt-3">Name:</Label>
          <Input autoFocus id="name" name="hostname" type="text" className="mt-1 ring-company-orange focus:border-company-orange" placeholder="Server name, virtual machine, etc..." />
          <Label htmlFor="ip" className="mt-3">Ip Address:</Label>
          <Input id="ip" name="ip" type="text" className="mt-1 ring-company-orange focus:border-company-orange" placeholder="x.x.x.x or site.com" />
          <Label htmlFor="description" className="mt-3">Description:</Label>
          <Textarea id="description" name="description" className="mt-1 ring-company-orange focus:border-company-orange" />
          <h3>Details</h3>
          <ul>
            
          </ul>
          <Button type="submit" className="bg-company-orange text-white mt-6">Submit</Button>
        </form>
      </Modal>
    </>
  );
}

interface IDetail {
  key: string,
  value: string
}