"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef } from "react";

export default function Modal({children}: {children: ReactNode}){

  const modalBgRef = useRef(null);
  const router = useRouter();

  const backgroundClick = () => {
    router.back();
  }

  const handleEsc = (e: KeyboardEvent) => {
    if(e.key === "Escape"){
      router.back();
    }
  }

  useEffect(() => {
    const bodyEl = document.querySelector("body");
    bodyEl?.setAttribute("height", "100vh");
    bodyEl?.setAttribute("width", "100vw");
    bodyEl?.setAttribute("style", "overflow: hidden;");

    return () => {
    bodyEl?.setAttribute("height", "100%");
    bodyEl?.setAttribute("width", "100%");
    bodyEl?.setAttribute("style", "overflow: auto;");
    }
  });

  return(
    <>
      <div className="absolute bg-modal-bkg w-full h-full top-0 left-0" ref={modalBgRef} onClick={backgroundClick} onKeyUp={handleEsc}>
        {children}
      </div>
    </>
  );
}