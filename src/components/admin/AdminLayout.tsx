import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("admin_session_token");
      localStorage.removeItem("admin_email");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_role");
      navigate("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <Shield className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-primary sm:text-xl">
                Admin · Seguros de Crédito
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Conteúdo e artigos do site
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="shrink-0 gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
