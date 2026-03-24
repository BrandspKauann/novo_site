import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SpecialistContactDialog } from "@/components/SpecialistContactDialog";

type SpecialistContactContextValue = {
  openSpecialistForm: (source?: string) => void;
};

const SpecialistContactContext = createContext<SpecialistContactContextValue | null>(null);

export function SpecialistContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");

  const openSpecialistForm = useCallback((nextSource?: string) => {
    setSource(nextSource?.trim() || "site");
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openSpecialistForm }), [openSpecialistForm]);

  return (
    <SpecialistContactContext.Provider value={value}>
      {children}
      <SpecialistContactDialog open={open} onOpenChange={setOpen} source={source} />
    </SpecialistContactContext.Provider>
  );
}

export function useSpecialistContact() {
  const ctx = useContext(SpecialistContactContext);
  if (!ctx) {
    throw new Error("useSpecialistContact deve ser usado dentro de SpecialistContactProvider");
  }
  return ctx;
}
