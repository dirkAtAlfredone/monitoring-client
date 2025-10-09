"use client";

import { HostStatus, IHost } from "@/models/host";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const URI = process.env.NEXT_PUBLIC_URI;

export default function Status({ host }: { host: IHost }) {

  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(host.status);
  const [countdown, setCountdown] = useState(60);

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

        if(status === "pinging"){
          const {data} = await axios.get(`${URI}/api/v1/ping/icmp/${host.ip}`);
          setStatus(data.status);
        }

        if (countdown <= 0) {
          setCountdown(60);
          await checkPing();
          const intervalId = setInterval(async () => await checkPing(), 60000);
          if(!!intervalRef.current && intervalId !== intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = intervalId;
          }
        }
        else {
          setTimeout(() => setCountdown(countdown - 1), 1000);
        }
      })();
    }
    return () => {
      if (!!intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [countdown, loaded]);

  return (
    <>
      <p className="absolute">
        status: <span>{`${status}${status === "pinging" ? "..." : `(${countdown})`}`}</span>
      </p>
    </>
  );
}