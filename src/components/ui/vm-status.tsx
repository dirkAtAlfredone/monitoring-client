"use client";

import axios from "axios";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import checkmark from "../../../public/icons/checkmark.svg";
import Image from "next/image";

const URI = process.env.NEXT_PUBLIC_URI;

export default function VMStatus({ status, id }: { status: 'running' | 'stopped' | 'paused', id: string }) {

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

  const handleReset = (e: MouseEvent) => {
    e.preventDefault();
    setSpinner(true);
    (async () => {
      const { data } = await axios.get(`${URI}/api/v1/resources/status/${id}`);
      setCurrent(data.status);
    setSpinner(false);
    setCountdown(60);
    })();
  }

  return (
    <div className="flex absolute top-2 right-2 gap-0.5 items-center z-50">
      <Button className={`h-fit p-0.5 rounded-b-full hover:bg-[#FFE6D6] bg-white ${spinner ? "spinner" : ""}`} onClick={handleReset} ><Image className="w-[80%] h-[80%] object-cover" src={checkmark} alt="checkmark" /></Button>
      <Badge className={`${spinner ? "bg-amber-500" : status === "running" ? "bg-green-500" : status === "stopped" ? "bg-red-500" : "bg-amber-500"} text-white`}>
        {spinner ? "pending" : current}&nbsp;{spinner ? "..." : `(${String(countdown).padStart(2, "0")})`}
      </Badge>
    </div>
  );
}