import { ReactNode } from "react";

export default function Modal({children}: {children: ReactNode}){
  return(
    <>
      <div className="absolute bg-modal-bkg w-full h-full top-0 left-0">
        {children}
      </div>
    </>
  );
}