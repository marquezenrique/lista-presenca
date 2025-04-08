import { useEffect, useRef, useState } from "react";

import ListItem from "./list-item";
import type { NameOutput } from "@/src/app/types";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function List({
  names,
  handleRemove,
}: {
  names: NameOutput[];
  handleRemove: (id: string) => Promise<void>;
}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < names.length) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, names.length]);

  return (
    <div>
      <ul className="flex flex-col gap-1 px-4 pb-4 max-w-[800px] mx-auto">
        {names.slice(0, visibleCount).map((name, index) => (
          <ListItem
            key={name._id}
            index={index}
            name={name}
            remove={() => handleRemove(name._id)}
          />
        ))}
        {visibleCount < names.length && (
          <Skeleton ref={loaderRef} className="h-[3.25rem] w-full" />
        )}
      </ul>
    </div>
  );
}
