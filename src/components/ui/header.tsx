"use client";

import type { Dispatch, SetStateAction } from "react";

import { Button } from "./button";
import { Input } from "./input";

export default function Header({
  handleSubmit,
  newName,
  setNewName,
}: {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  newName: string;
  setNewName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className="w-full bg-accent">
      <header className="flex flex-col gap-2 p-4 max-w-[800px] mx-auto">
        <h1 className="text-lg md:text-xl font-semibold">Lista de Pagantes</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            className=""
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Digite um nome"
          />
          <Button type="submit" variant="default">
            Adicionar
          </Button>
        </form>
      </header>
    </header>
  );
}
