import { Button } from "./ui/button";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-credit-insurance.jpg";

const Hero = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";

  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Seguro de Crédito Empresarial" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80 dark:opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            <span className="text-secondary font-semibold text-sm sm:text-base">Parceria oficial Coface</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
            Seguro de Crédito
            <span className="block text-secondary">Empresarial</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
            Blindagem do fluxo de caixa para empresas que vendem a prazo. 
            <span className="block mt-2 text-secondary font-semibold">
              Você protege sua fábrica, seu estoque e sua equipe. Mas quem protege o seu contas a receber?
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <span className="hidden sm:inline">Descubra em 2 minutos se sua empresa tem perfil</span>
              <span className="sm:hidden">Análise em 2 minutos</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Saiba mais
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-secondary/10 p-2 sm:p-3 rounded-full">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <span className="text-primary-foreground text-xs sm:text-sm font-medium">Proteção 360°</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-secondary/10 p-2 sm:p-3 rounded-full">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <span className="text-primary-foreground text-xs sm:text-sm font-medium">Crescimento Seguro</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-secondary/10 p-2 sm:p-3 rounded-full">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <span className="text-primary-foreground text-xs sm:text-sm font-medium">Parceiro Coface</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
