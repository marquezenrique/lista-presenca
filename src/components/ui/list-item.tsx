import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

import { Button } from "./button";
import type { MouseEventHandler } from "react";
import type { NameOutput } from "@/src/app/types";
import { X } from "lucide-react";
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
      <AlertDialog>
        <AlertDialogTrigger asChild className="flex-none shrink-0">
          <Button variant="destructive">
            <X className="size-4 md:size-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você deseja confirmar a remoção de{" "}
              <span className="text-black/80 font-medium">{name.name}</span> da
              lista de pagantes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={remove}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}

export default memo(ListItem);
