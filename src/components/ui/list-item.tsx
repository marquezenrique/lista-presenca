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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { LoaderCircle, Pencil, PlusCircle, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

import { Button } from "./button";
import { Input } from "./input";
import type { MouseEventHandler } from "react";
import type { NameOutput } from "@/src/lib/types";
import { memo } from "react";
import { useState } from "react";

type Props = {
  name: NameOutput;
  index: number;
  remove: MouseEventHandler<HTMLButtonElement>;
  updateName: (newName: string) => Promise<void>;
  isUpdating: boolean;
};

function ListItem({ name, index, remove, updateName, isUpdating }: Props) {
  const [editedName, setEditedName] = useState(name.name);

  const handleSave = async () => {
    if (editedName.trim() === name.name) return;
    await updateName(editedName.trim());
  };

  return (
    <li className="h-[3.25rem] flex w-full bg-black/5 justify-between items-center pl-3 p-2 rounded-md gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="h-7 px-2.5 font-medium text-sm bg-neutral-800 leading-none flex items-center rounded text-accent shrink-0">
          {index + 1}
        </div>
        <p className="truncate min-w-0">{name.name}</p>
      </div>
      <div className="flex items-center gap-2 flex-none shrink-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="hidden md:inline-flex">
                <PlusCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name.addedBy}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <Pencil className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar nome</DialogTitle>
              <DialogDescription>
                Editar o nome deste pagante:
              </DialogDescription>
            </DialogHeader>
            <Input
              defaultValue={name.name}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <DialogFooter className="sm:justify-start">
              <Button
                variant="default"
                onClick={handleSave}
                disabled={isUpdating || editedName.trim() === name.name}
              >
                {isUpdating ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="size-4 md:size-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Você deseja confirmar a remoção de{" "}
                <span className="text-black/80 font-medium">{name.name}</span>{" "}
                da lista de pagantes?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={remove}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}

export default memo(ListItem);
