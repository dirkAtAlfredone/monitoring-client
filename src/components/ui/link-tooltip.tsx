import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";
import Link from "next/link";
import { ReactNode } from "react";

export default function LinkTooltip({ children, text = "", link = "#", target = "_self" }: {children: ReactNode, text?: string, link?: string, target?: "_self" | "_blank"}){
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Link href={link} className="block p-1 h-full w-full rounded-full hover:bg-[#FFE6D6]" target={target}>
            { children }
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          { text }
        </TooltipContent>
      </Tooltip>
    </>
  );
}