import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { NewsletterSubscribeDialog } from "@/components/NewsletterSubscribeDialog";
import { SpecialistContactDialog } from "@/components/SpecialistContactDialog";

type SpecialistContactContextValue = {
  openSpecialistForm: (source?: string) => void;
  openNewsletterForm: (source?: string) => void;
};

const SpecialistContactContext = createContext<SpecialistContactContextValue | null>(null);

export function SpecialistContactProvider({ children }: { children: ReactNode }) {
  const [specialistOpen, setSpecialistOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [specialistSource, setSpecialistSource] = useState("site");
  const [newsletterSource, setNewsletterSource] = useState("newsletter");

  const openSpecialistForm = useCallback((nextSource?: string) => {
    setSpecialistSource(nextSource?.trim() || "site");
    setSpecialistOpen(true);
  }, []);

  const openNewsletterForm = useCallback((nextSource?: string) => {
    setNewsletterSource(nextSource?.trim() || "newsletter");
    setNewsletterOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openSpecialistForm, openNewsletterForm }),
    [openNewsletterForm, openSpecialistForm],
  );

  return (
    <SpecialistContactContext.Provider value={value}>
      {children}
      <SpecialistContactDialog
        open={specialistOpen}
        onOpenChange={setSpecialistOpen}
        source={specialistSource}
      />
      <NewsletterSubscribeDialog
        open={newsletterOpen}
        onOpenChange={setNewsletterOpen}
        source={newsletterSource}
      />
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
