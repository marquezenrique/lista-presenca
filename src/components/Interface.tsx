"use client";

import type { NameOutput, PresenceListProps } from "@/src/app/types";
import { useCallback, useState } from "react";

import Header from "./ui/header";
import List from "./ui/list";

export default function Interface({ initialNames }: PresenceListProps) {
  const [names, setNames] = useState<NameOutput[]>(initialNames || []);
  const [newName, setNewName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      const response = await fetch("/api/names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar");

      const data: NameOutput = await response.json();
      setNames((prev) => [...prev, data]);
      setNewName("");
    } catch (error) {
      console.error("Erro ao adicionar nome:", error);
    }
  };

  const handleRemove = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/names?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao remover");

      setNames((prev) => prev.filter((name) => name._id !== id));
    } catch (error) {
      console.error("Erro ao remover nome:", error);
    }
  }, []);

  return (
    <main className="h-dvh flex flex-col gap-2 mx-auto">
      <Header
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
      />
      <List handleRemove={handleRemove} names={names} />
    </main>
  );
}
