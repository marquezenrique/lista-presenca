"use client";

import { useEffect, useState } from "react";

import Interface from "../../components/Interface";
import type { NameOutput } from "../../lib/types";

export default function Client() {
  const [names, setNames] = useState<NameOutput[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/names", {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json();
        setNames(data);
      } catch (error) {
        console.error("Erro ao carregar nomes:", error);
      }
    };

    fetchNames();
  }, []);

  return <Interface initialNames={names} />;
}
