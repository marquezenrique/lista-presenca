"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAccess } from "../contexts/AccessContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  inputKey: z.string().min(2, {
    message: "Você deve inserir uma key para acessar a lista",
  }),
});

export default function Home() {
  const { validateKey } = useAccess();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!validateKey(values.inputKey)) {
      setError("Key inválida. Por favor, tente novamente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="inputKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acesso ao Sistema</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sua key"
                    onKeyUp={() => {
                      setError("");
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Insira sua key de acesso:</FormDescription>
                {error.length > 0 && <FormMessage>{error}</FormMessage>}
              </FormItem>
            )}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Form>
    </div>
  );
}
