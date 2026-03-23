import { createContext, useContext, useEffect } from "react";

type Theme = "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  /** Ignorado: o site usa apenas tema claro */
  defaultTheme?: "light";
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    try {
      localStorage.setItem(storageKey, "light");
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const value = {
    theme: "light" as const,
    setTheme: () => {
      /* modo escuro desativado */
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};