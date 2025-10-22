"use client";

import { HostStatus, IHost } from "@/models/host";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../shadcn/badge";

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

        if(status === "pinging"){
          const {data} = await axios.get(`${URI}/api/v1/ping/icmp/${host.ip}`);
          setStatus(data.status);
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

  return (
    <>
      <Badge className={`${status === "live" ? "bg-green-500" : status === "unreachable" ? "bg-red-500" : "bg-amber-500"} absolute top-2 right-2 text-white`}>
        {`${status === "live" ? "online" : status === "unreachable" ? "offline" : "pinging"}(${countdown})`}
      </Badge>
      
    </>
  );
}