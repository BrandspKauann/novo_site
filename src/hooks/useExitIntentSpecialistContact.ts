import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";

/** Tempo mínimo na sessão antes de permitir o disparo */
const MIN_VISIT_MS = 60_000;
/** Faixa superior do viewport (px): zona típica ao ir para abas / chrome */
const TOP_EDGE_PX = 12;
/** Janela para analisar trajetória do cursor */
const TRAJECTORY_MS = 550;
/** Quanto o cursor precisa ter subido nessa janela (px) */
const MIN_UPWARD_TRAVEL_PX = 40;
const STORAGE_VISIT_START = "seguros_exit_intent_visit_start";
const STORAGE_ALREADY_SHOWN = "seguros_exit_intent_contact_done";

function sessionVisitStart(): number {
  try {
    const raw = sessionStorage.getItem(STORAGE_VISIT_START);
    if (raw) {
      const t = Number(raw);
      if (Number.isFinite(t)) return t;
    }
    const t = Date.now();
    sessionStorage.setItem(STORAGE_VISIT_START, String(t));
    return t;
  } catch {
    return Date.now();
  }
}

function isLeavingDocument(e: MouseEvent): boolean {
  const t = e.relatedTarget as Node | null;
  if (t === null) return true;
  try {
    return !document.documentElement.contains(t);
  } catch {
    return true;
  }
}

function hadRecentUpwardApproachToTop(exitY: number, samples: { t: number; y: number }[]): boolean {
  const now = Date.now();
  const windowStart = now - TRAJECTORY_MS;
  const inWindow = samples.filter((s) => s.t >= windowStart);
  if (inWindow.length < 2) return false;
  const maxY = Math.max(...inWindow.map((s) => s.y));
  return maxY - exitY >= MIN_UPWARD_TRAVEL_PX && exitY <= TOP_EDGE_PX;
}

/**
 * Abre o formulário de especialista quando o visitante, após ≥1 min na sessão,
 * sai do documento pela borda superior com trajetória ascendente — padrão compatível
 * com “ir fechar a aba” (o navegador não expõe a posição exata do X da aba).
 */
export function useExitIntentSpecialistContact() {
  const { openSpecialistForm } = useSpecialistContact();
  const location = useLocation();
  const samplesRef = useRef<{ t: number; y: number }[]>([]);
  const visitStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.pathname.startsWith("/admin")) return;

    try {
      if (sessionStorage.getItem(STORAGE_ALREADY_SHOWN)) return;
    } catch {
      /* ignore */
    }

    if (!window.matchMedia("(pointer: fine)").matches) return;

    visitStartRef.current = sessionVisitStart();

    const trimSamples = () => {
      const now = Date.now();
      const arr = samplesRef.current;
      const cutoff = now - TRAJECTORY_MS - 100;
      while (arr.length > 0 && arr[0].t < cutoff) arr.shift();
    };

    const onMove = (e: MouseEvent) => {
      samplesRef.current.push({ t: Date.now(), y: e.clientY });
      trimSamples();
    };

    const onOut = (e: MouseEvent) => {
      try {
        if (sessionStorage.getItem(STORAGE_ALREADY_SHOWN)) return;
      } catch {
        /* ignore */
      }

      const start = visitStartRef.current ?? sessionVisitStart();
      if (Date.now() - start < MIN_VISIT_MS) return;
      if (!isLeavingDocument(e)) return;
      if (e.clientY > TOP_EDGE_PX) return;
      if (!hadRecentUpwardApproachToTop(e.clientY, samplesRef.current)) return;

      try {
        sessionStorage.setItem(STORAGE_ALREADY_SHOWN, "1");
      } catch {
        /* ignore */
      }
      openSpecialistForm("exit-intent");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, [location.pathname, openSpecialistForm]);
}
