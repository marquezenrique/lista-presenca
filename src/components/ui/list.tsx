import ListItem from "./list-item";
import type { NameOutput } from "@/src/app/types";

export default function List({
  names,
  handleRemove,
}: {
  names: NameOutput[];
  handleRemove: (id: string) => Promise<void>;
}) {
  return (
    <div>
      <ul className="flex flex-col gap-1 px-4 pb-4 max-w-[800px] mx-auto">
        {names.map((name, index) => (
          <ListItem
            key={name._id}
            index={index}
            name={name}
            remove={() => handleRemove(name._id)}
          />
        ))}
      </ul>
    </div>
  );
}
