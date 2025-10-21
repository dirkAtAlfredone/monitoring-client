"use client";

import { Button } from "../shadcn/button";
import trash from "../../../public/icons/trash-03.svg";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";

export default function DeleteButton() {

  const handleDelete = () => {

  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="bg-white hover:bg-red-200 hover:border-red-200" onClick={handleDelete}>
            <Image src={trash} alt="trash icon" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}