"use client";

import { HostStatus, IHost } from "@/models/host";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import checkmark from "../../../public/icons/checkmark.svg";
import Image from "next/image";

const URI = process.env.NEXT_PUBLIC_URI;

export default function Status({ host }: { host: IHost }) {

  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(host.status);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const checkPing = async () => {
      const { data } = await axios.get(`${URI}/api/v1/address/status/${host.id}`);
      if (data.status !== status) {
        setStatus(data.status);
      }
    };

    if (!loaded) {
      setLoaded(true);
    } else {
      (async () => {

        if (status === "pinging") {
          const { data } = await axios.get(`${URI}/api/v1/ping/icmp/${host.ip}`);
          setStatus(data.status);
          setCountdown(60);
        }

        if (countdown <= 0) {
          await checkPing();
          setCountdown(60);
        }
        else {
          setTimeout(() => setCountdown(countdown - 1), 1000);
        }
      })();
    }
  }, [countdown, loaded]);

  const handleReset = () => {
    setStatus(HostStatus.pinging);
  }

return (
  <div className="flex absolute top-2 right-2 gap-1">
    <Button className={`h-fit p-0 bg-white ${status === HostStatus.pinging ? "spinner" : ""}`} onClick={handleReset}><Image src={checkmark} alt="checkmark" /></Button>
    <Badge className={`${status === "live" ? "bg-green-500" : status === "unreachable" ? "bg-red-500" : "bg-amber-500"} text-white`}>
      {`${status === "live" ? "online" : status === "unreachable" ? "offline" : "pinging"}${status === "pinging" ? "..." : `(${String(countdown).padStart(2, "0")})`}`}
    </Badge>
  </div>
);
}