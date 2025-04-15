import { Input } from "./input";
import ListItem from "./list-item";
import type { NameOutput } from "@/src/lib/types";
import type { ObjectId } from "mongodb";
import { Search } from "lucide-react";
import { useState } from "react";

export default function List({
  names,
  handleRemove,
  handleUpdateName,
  isUpdating,
}: {
  names: NameOutput[];
  handleRemove: (id: ObjectId) => Promise<void>;
  handleUpdateName: (id: ObjectId, newName: string) => Promise<void>;
  isUpdating: Record<string, boolean>;
}) {
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <div className="flex items-center px-4 h-fit pb-4 max-w-[800px] mx-auto gap-2">
        <p className="flex-none text-xs text-neutral-800/45 font-semibold">
          {names.length} Pagantes
        </p>
        <div className="w-full h-px bg-neutral-800/15" />
      </div>
      <div className="flex px-4 h-fit pb-4 max-w-[800px] mx-auto gap-2">
        <div className="size-9 text-sm bg-black/5 border border-solid border-black/5 leading-none grid place-items-center rounded-md text-accent shrink-0">
          <Search className="size-4 text-neutral-800" />
        </div>
        <Input
          value={search}
          placeholder="Buscar nome"
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm md:text-base"
          type="text"
        />
      </div>
      <ul className="flex flex-col gap-1 px-4 pb-4 max-w-[800px] mx-auto">
        {names.map((name, index) => {
          const query = search.trim().toLowerCase();
          const nameMatch = name.name.toLowerCase().includes(query);

          if (!nameMatch) return null;

          return (
            <ListItem
              key={String(name._id)}
              index={index}
              name={name}
              remove={() => handleRemove(name._id)}
              updateName={(newName) => handleUpdateName(name._id, newName)}
              isUpdating={isUpdating[name._id.toString()] || false}
            />
          );
        })}
      </ul>
    </div>
  );
}
