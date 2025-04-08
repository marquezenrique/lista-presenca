import { Button } from "./button";
import type { MouseEventHandler } from "react";
import type { NameOutput } from "@/src/app/types";
import { memo } from "react";

type Props = {
  name: NameOutput;
  index: number;
  remove: MouseEventHandler<HTMLButtonElement>;
};

function ListItem({ name, index, remove }: Props) {
  return (
    <li className="h-[3.25rem] flex w-full bg-black/5 justify-between items-center pl-3 p-2 rounded-md gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="h-7 px-2.5 text-sm bg-neutral-800 leading-none flex items-center rounded text-accent shrink-0">
          {index + 1}
        </div>
        <p className="truncate min-w-0">{name.name}</p>
      </div>
      <Button
        onClick={remove}
        className="flex-none shrink-0"
        variant="destructive"
      >
        Remover
      </Button>
    </li>
  );
}

export default memo(ListItem);
