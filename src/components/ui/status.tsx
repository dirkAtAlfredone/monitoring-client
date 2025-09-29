"use client";

import { HostStatus, IHost } from "@/models/host";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const URI = process.env.NEXT_PUBLIC_URI;

export default function Status({ host }: { host: IHost }) {

  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(HostStatus.pinging);

  const intervalRef = useRef<NodeJS.Timeout>(null);

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
        await checkPing();
        const intervalId = setInterval(async () => await checkPing(), 60000);
        if(!!intervalRef.current && intervalId !== intervalRef.current){
          clearInterval(intervalRef.current);
          intervalRef.current = intervalId;
        }
      })();
    }
    return () => {
      if(!!intervalRef.current){
        clearInterval(intervalRef.current);
      }
    }
  });

  return (
    <>
      <p className="absolute">
        status: <span>{status}</span>
      </p>
    </>
  );
}