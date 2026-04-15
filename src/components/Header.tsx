import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappLink = "https://wa.link/d3f6ih";

  const menuItems: Array<{ label: string; href: string; type: "route" | "anchor" }> = [
    { label: "Início", href: "/", type: "route" },
    { label: "Benefícios", href: "#o-que-e", type: "anchor" },
    { label: "Soluções", href: "#servicos", type: "anchor" },
    { label: "Conteúdo", href: "/conteudo", type: "route" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (item: typeof menuItems[number]) => {
    if (item.type === "route") {
      if (item.href === "/") {
        window.location.href = "/";
      } else {
        navigate(item.href);
      }
      setIsMenuOpen(false);
      return;
    }

    // Para links de âncora, se não estiver na home, navegar para home primeiro
    if (item.type === "anchor") {
      if (location.pathname !== "/") {
        window.location.href = `/${item.href}`;
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`w-full bg-white dark:bg-background border-b border-border sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg shadow-primary/5" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
          {/* Brand */}
          <div className="col-start-1 flex min-w-0 justify-self-start">
            <a
              href="/"
              className="group inline-flex items-baseline gap-x-1 sm:gap-x-1.5 min-w-0"
            >
              <span className="text-base sm:text-lg md:text-xl font-bold text-primary group-hover:text-trust-blue transition-colors leading-none">
                Seguros de
              </span>
              <span className="inline-flex flex-col items-start leading-none">
                <span className="text-base sm:text-lg md:text-xl font-bold text-primary group-hover:text-trust-blue transition-colors leading-none">
                  Crédito
                </span>
                <span className="text-[0.65rem] sm:text-xs font-medium text-muted-foreground group-hover:text-primary/70 transition-colors tracking-tight -mt-1 leading-none whitespace-nowrap">
                  by Hirayama
                </span>
              </span>
            </a>
          </div>

          {/* Menu central (desktop) */}
          <nav className="col-start-2 hidden items-center justify-center space-x-0.5 lg:space-x-1 justify-self-center md:flex">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item)}
                className="px-3 py-2.5 lg:px-4 text-sm lg:text-base text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-all duration-300 font-medium whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Ações à direita */}
          <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
            <Button
              variant="hero"
              size="lg"
              onClick={() => window.open(whatsappLink, "_blank")}
              className="hidden sm:flex shadow-md hover:shadow-lg transition-shadow"
            >
              Falar no WhatsApp
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item)}
                      className="text-left px-4 py-3 text-base text-corporate-gray hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(whatsappLink, "_blank");
                    }}
                    className="mt-4 w-full"
                  >
                    Falar no WhatsApp
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
