import { useExitIntentSpecialistContact } from "@/hooks/useExitIntentSpecialistContact";

/** Registra exit-intent (borda superior + trajetória ascendente) após 1 min na sessão. */
export function ExitIntentContactListener() {
  useExitIntentSpecialistContact();
  return null;
}
