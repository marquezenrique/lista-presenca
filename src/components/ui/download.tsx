import { Button } from "./button";
import { DownloadCloud } from "lucide-react";
import type { NameOutput } from "@/src/lib/types";

export default function Download({ names }: { names: NameOutput[] }) {
  const downloadNameList = () => {
    if (!names.length) return;

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const fileName = `lista-pagantes${day}-${month}.txt`;

    const content = names
      .map((name, index) => `${index + 1}. ${name.name} ✅`)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
  return (
    <Button
      variant="default"
      onClick={downloadNameList}
      className="fixed bottom-6 right-8"
    >
      <DownloadCloud />
    </Button>
  );
}
