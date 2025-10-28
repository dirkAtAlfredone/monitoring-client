"use client";

import { HostStatus, IHost } from "@/models/host";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import checkmark from "../../../public/icons/checkmark.svg";
import Image from "next/image";

const URI = process.env.NEXT_PUBLIC_URI;

export default function Status({ status, id }: { status: "online" | "offline", id: string }) {

  const [current, setCurrent] = useState(status);
  const [countdown, setCountdown] = useState(60);
  const [spinner, setSpinner] = useState(false);
  const timeOutRef = useRef< null | NodeJS.Timeout>(null);

  useEffect(() => {

    if (countdown === 0) {
      (async () => {
        setSpinner(true);
        const { data } = await axios.get(`${URI}/api/v1/resources/status/${id}`);
        setCurrent(data.status);
        setSpinner(false);
        setCountdown(60);
      })();
    }
    else {
      timeOutRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if(timeOutRef.current){
        clearTimeout(timeOutRef.current);
      }
    }
  }, [countdown]);

  const handleReset = () => {
    setSpinner(true);
    (async () => {
      const { data } = await axios.get(`${URI}/api/v1/resources/status/${id}`);
      setCurrent(data.status);
    setSpinner(false);
    setCountdown(60);
    })();
  }

  return (
    <div className="flex absolute top-2 right-2 gap-0.5 items-center">
      <Button className={`h-fit p-0.5 rounded-b-full hover:bg-[#FFE6D6] bg-white ${spinner ? "spinner" : ""}`} onClick={handleReset} disabled={spinner} ><Image className="w-[80%] h-[80%] object-cover" src={checkmark} alt="checkmark" /></Button>
      <Badge className={`${spinner ? "bg-amber-500" : status === "online" ? "bg-green-500" : "bg-red-500"} text-white`}>
        {spinner ? "pending" : current}&nbsp;{spinner ? "..." : `(${String(countdown).padStart(2, "0")})`}
      </Badge>
    </div>
  );
}