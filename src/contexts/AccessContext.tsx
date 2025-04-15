"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { accessKeys } from "../lib/utils";
import { useRouter } from "next/navigation";

type AccessContextType = {
  currentKey: string | null;
  currentUser: string | null;
  validateKey: (key: string) => boolean;
  logout: () => void;
};

const AccessContext = createContext<AccessContextType | undefined>(undefined);

const encode = (str: string) => btoa(str);
const decode = (str: string) => {
  try {
    return atob(str);
  } catch {
    return "";
  }
};

export function AccessProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const encodedKey = localStorage.getItem("accessKey");
    const savedKey = encodedKey ? decode(encodedKey) : null;

    if (savedKey && accessKeys[savedKey]) {
      setCurrentKey(savedKey);
      setCurrentUser(accessKeys[savedKey]);
      router.push("/client");
    } else {
      router.push("/");
    }
  }, [router]);

  const validateKey = (key: string) => {
    if (accessKeys[key]) {
      setCurrentKey(key);
      setCurrentUser(accessKeys[key]);
      localStorage.setItem("accessKey", encode(key));
      router.push("/client");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("accessKey");
    setCurrentKey(null);
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <AccessContext.Provider
      value={{ currentKey, currentUser, validateKey, logout }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
}
