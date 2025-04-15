"use client";

import type { NameOutput, PresenceListProps } from "@/src/lib/types";
import { useCallback, useEffect, useState } from "react";

import Download from "./ui/download";
import Header from "./ui/header";
import List from "./ui/list";
import type { ObjectId } from "mongodb";
import { useAccess } from "../contexts/AccessContext";

export default function Interface({ initialNames }: PresenceListProps) {
  const [names, setNames] = useState<NameOutput[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const { currentUser } = useAccess();

  useEffect(() => {
    if (initialNames.length > 0) {
      setNames(initialNames);
    }
  }, [initialNames]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      const response = await fetch("/api/names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, addedBy: currentUser }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar");

      const data: NameOutput = await response.json();
      setNames((prev) => [...prev, data]);
      setNewName("");
    } catch (error) {
      console.error("Erro ao adicionar nome:", error);
    }
  };

  const handleRemove = useCallback(async (id: ObjectId) => {
    try {
      const response = await fetch(`/api/names?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao remover");
      setNames((prev) => prev.filter((name) => name._id !== id));
    } catch (error) {
      console.error("Erro ao remover nome:", error);
    }
  }, []);

  const handleUpdateName = useCallback(
    async (id: ObjectId, newName: string) => {
      try {
        setIsUpdating((prev) => ({ ...prev, [id.toString()]: true }));

        const response = await fetch("/api/names", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id, name: newName }),
        });

        if (!response.ok) throw new Error("Falha ao atualizar nome");

        setNames((prev) =>
          prev.map((name) =>
            name._id === id ? { ...name, name: newName } : name
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar nome:", error);
      } finally {
        setIsUpdating((prev) => ({ ...prev, [id.toString()]: false }));
      }
    },
    []
  );

  return (
    <main className="h-dvh flex flex-col gap-2 mx-auto">
      <Header
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
      />
      <List
        names={names}
        handleRemove={handleRemove}
        handleUpdateName={handleUpdateName}
        isUpdating={isUpdating}
      />
      <Download names={names} />
    </main>
  );
}
