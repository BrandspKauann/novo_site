import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";

  const menuItems = [
    { label: "O que é", href: "#o-que-e" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Cases", href: "#casos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Diagnóstico", href: "#diagnostico" },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold text-primary">Seguro de Crédito</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-corporate-gray hover:text-primary transition-colors text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="hidden sm:flex"
            >
              Falar no WhatsApp
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleMenuClick}
                      className="text-lg text-corporate-gray hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(whatsappLink, '_blank');
                    }}
                    className="mt-4"
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
