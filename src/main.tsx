import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Carregar script do Leadster/Neurolead
(function(a: any, b: Document, c: string, d: string) {
  try {
    const e = b.head || b.getElementsByTagName("head")[0];
    const f = b.createElement("script");
    f.setAttribute("src", c);
    f.setAttribute("charset", "UTF-8");
    f.defer = true;
    (a as any).neuroleadId = d;
    e.appendChild(f);
  } catch (g) {
    console.error("Erro ao carregar script Leadster:", g);
  }
})(window, document, "https://cdn.leadster.com.br/neurolead/neurolead.min.js", "PGyW7bBG4sy13Q9nrdz3MndBD");

createRoot(document.getElementById("root")!).render(<App />);
