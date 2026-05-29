"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type CursorMode = "default" | "view" | "drag" | "link" | "hidden";

interface CursorContextValue {
  mode: CursorMode;
  label: string;
  setCursorMode: (mode: CursorMode, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  mode: "default",
  label: "",
  setCursorMode: () => {},
  resetCursor: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");

  const setCursorMode = useCallback((newMode: CursorMode, newLabel = "") => {
    setMode(newMode);
    setLabel(newLabel);
  }, []);

  const resetCursor = useCallback(() => {
    setMode("default");
    setLabel("");
  }, []);

  return (
    <CursorContext.Provider value={{ mode, label, setCursorMode, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}
