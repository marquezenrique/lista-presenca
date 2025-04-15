import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const accessKeys: Record<string, string> = {
  emarquez: "Enrique Marquez",
  jgasquel: "João Gasquel",
  fettinger: "Felipe Ettinger",
  mbraga: "M. Luisa Braga",
  ggasquel: "Guilherme Gasquel",
  mpitangueira: "Camila Pitangueira",
  vmeireles: "M. Vitória Meireles",
};
