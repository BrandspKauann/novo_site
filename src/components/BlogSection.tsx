import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Play, FileText, Video } from "lucide-react";

const BlogSection = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";
  
  const articles = [
    {
      type: "video",
      icon: <Play className="h-5 w-5" />,
      title: "Seguro de Crédito em 60 segundos",
      description: "Entenda rapidamente como funciona o seguro que protege suas vendas a prazo",
      readTime: "1 min",
      category: "Introdução"
    },
    {
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      title: "O caso Americanas explicado",
      description: "Como o Seguro de Crédito protegeu fornecedores na maior crise do varejo brasileiro",
      readTime: "5 min",
      category: "Case Real"
    },
    {
      type: "video",
      icon: <Video className="h-5 w-5" />,
      title: "Como exportar sem risco de inadimplência",
      description: "Estratégias para expandir internacionalmente com segurança",
      readTime: "8 min",
      category: "Exportação"
    },
    {
      type: "article", 
      icon: <FileText className="h-5 w-5" />,
      title: "Mitos e verdades sobre Seguro de Crédito",
      description: "Desmistificamos as principais dúvidas sobre proteção de crédito empresarial",
      readTime: "6 min",
      category: "Educativo"
    },
    {
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      title: "BI Coface: o poder da informação antes de vender",
      description: "Como a inteligência de negócios pode transformar sua gestão de risco",
      readTime: "7 min",
      category: "Business Intelligence"
    },
    {
      type: "video",
      icon: <Play className="h-5 w-5" />,
      title: "40% das falências têm relação com inadimplência",
      description: "Dados da Coface revelam o impacto da inadimplência em cadeia no Brasil",
      readTime: "4 min",
      category: "Mercado"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Conteúdo Educativo
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto leading-relaxed">
            Aprenda mais sobre Seguro de Crédito, gestão de risco e proteção empresarial 
            com nossos conteúdos especializados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {articles.map((article, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0 cursor-pointer group">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    article.type === 'video' 
                      ? 'bg-trust-blue/10 text-trust-blue' 
                      : 'bg-secondary/10 text-secondary'
                  }`}>
                    {article.icon}
                    <span>{article.type === 'video' ? 'Vídeo' : 'Artigo'}</span>
                  </div>
                  <span className="text-xs text-corporate-gray">{article.readTime}</span>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-semibold text-trust-blue bg-trust-blue/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-trust-blue transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-corporate-gray text-sm leading-relaxed mb-4">
                  {article.description}
                </p>

                <div className="flex items-center text-trust-blue font-semibold text-sm group-hover:text-trust-blue-light transition-colors">
                  <span>Ler mais</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="premium" 
            size="lg"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            Ver todos os conteúdos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;