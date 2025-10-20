import { Button } from "./ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Hirayama Seguros</h3>
              <p className="text-sm text-primary-foreground/70">
                Hirayama Administradora e Corretora de Seguros LTDA
              </p>
              <p className="text-sm text-primary-foreground/70">
                CNPJ: 18.166.550/0001-40
              </p>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">
              Parceria oficial Coface – líder mundial em seguro de crédito e inteligência de riscos. 
              Protegemos o fluxo de caixa de empresas que vendem a prazo.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href="mailto:ewerton@hirayamacorretora.com.br" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  ewerton@hirayamacorretora.com.br
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <a href="tel:+5511972896857" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  (11) 97289-6857
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/80">São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#o-que-e" className="text-primary-foreground/80 hover:text-secondary transition-colors">O que é Seguro de Crédito</a></li>
              <li><a href="#beneficios" className="text-primary-foreground/80 hover:text-secondary transition-colors">Quem pode contratar</a></li>
              <li><a href="#casos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Cases de sucesso</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-secondary transition-colors">Serviços Coface</a></li>
              <li><a href="#diagnostico" className="text-primary-foreground/80 hover:text-secondary transition-colors">Diagnóstico online</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              <li><span className="text-primary-foreground/80">Seguro de Crédito</span></li>
              <li><span className="text-primary-foreground/80">Business Information</span></li>
              <li><span className="text-primary-foreground/80">Debt Collection</span></li>
              <li><span className="text-primary-foreground/80">Análise de Risco</span></li>
              <li><span className="text-primary-foreground/80">Consultoria Especializada</span></li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-hover rounded-2xl p-6 sm:p-8 mb-10 sm:mb-12 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Pronto para blindar seu fluxo de caixa?
          </h3>
          <p className="text-sm sm:text-base text-primary-foreground/80 mb-5 sm:mb-6 max-w-2xl mx-auto">
            Agende uma sessão estratégica gratuita com nossos especialistas e 
            descubra como proteger sua empresa contra inadimplência.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => window.open(whatsappLink, '_blank')}
              className="w-full sm:w-auto"
            >
              Falar no WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              Falar com Especialista
            </Button>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Hirayama Administradora e Corretora de Seguros LTDA. Todos os direitos reservados.
          </p>
          <p className="text-primary-foreground/60 text-xs mt-2">
            CNPJ: 18.166.550/0001-40
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;