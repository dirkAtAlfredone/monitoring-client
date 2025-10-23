"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ModalPage({backRoute}: {backRoute: string}){

  const path = usePathname();
  const router = useRouter();

  console.log(path);

  useEffect(() => {
    router.replace(backRoute);

    return () => {
      router.push(path);
    }
  });

  return (
    <></>
  );
}