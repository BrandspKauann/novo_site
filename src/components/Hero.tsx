import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-credit-insurance.jpg";
import { useEffect, useRef, useState } from "react";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";

const Hero = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const whatsappLink = "https://wa.link/d3f6ih";
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setScrollY(Math.max(0, window.scrollY));
        }
      }
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    "Cobertura de até 90%",
    "Análise prévia do comprador",
    "Proteção do fluxo de caixa",
  ];

  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const contentOffset = Math.min(scrollY * 0.15, 100);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[85vh] flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Background: foto mais visível à direita; “fumaça” escura à esquerda para contraste do texto */}
      <div className="absolute inset-0 z-0">
        <div
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          className="absolute inset-0 transition-transform duration-300 ease-out"
        >
          <img
            src={heroImage}
            alt="Seguro de Crédito Empresarial"
            className="w-full h-full object-cover object-[62%_center] sm:object-[58%_center] scale-110"
          />
        </div>
        {/* Camada base: mais escura à esquerda, irradiando um pouco mais pro centro */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/42 via-primary/12 via-[48%] to-transparent pointer-events-none"
          aria-hidden
        />
        {/* Gradiente principal: mais fechado no texto e “fumaça” mais longa antes de abrir a foto */}
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(100deg,hsl(var(--primary)_/_0.97)_0%,hsl(var(--primary)_/_0.90)_20%,hsl(var(--primary)_/_0.78)_42%,hsl(var(--primary)_/_0.52)_58%,hsl(var(--trust-blue)_/_0.38)_72%,hsl(var(--primary)_/_0.16)_86%,hsl(var(--primary)_/_0.05)_94%,transparent_100%)]"
          aria-hidden
        />
        {/* Radial maior no canto esquerdo/inferior para cravar contraste do bloco de texto */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(150%_100%_at_0%_85%,hsl(var(--primary)_/_0.58)_0%,hsl(var(--primary)_/_0.22)_45%,transparent_68%)]"
          aria-hidden
        />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trust-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div 
        className="container mx-auto px-4 py-16 sm:py-20 lg:py-24 relative z-10"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div className="max-w-5xl">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 sm:mb-6 leading-[1.1] tracking-tight">
            Seguro de Crédito
            <span className="block text-secondary mt-2 sm:mt-2.5">Empresarial</span>
          </h1>

          <p className="mb-7 sm:mb-8 max-w-2xl text-base font-medium leading-relaxed text-primary-foreground/95 sm:text-lg md:text-xl">
            Proteja suas vendas a prazo com a Coface. Análise de risco, limite de crédito e indenização em caso de
            inadimplência — com a Hirayama ao seu lado.
          </p>
          
          {/* CTA */}
          <div className="mb-8 sm:mb-10">
            <Button
              variant="hero"
              size="sm"
              className="text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 h-auto min-h-9 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => openSpecialistForm("hero")}
            >
              Falar com Especialista
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-1.5 sm:space-x-2 bg-white/15 backdrop-blur-lg rounded-full px-3 sm:px-5 py-2 sm:py-2.5 border border-white/30 shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary shrink-0" />
                <span className="text-primary-foreground text-xs sm:text-sm font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
