import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const DiagnosticSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";

  const questions = [
    {
      question: "Qual o faturamento anual da sua empresa?",
      options: [
        { value: "below-10", label: "Abaixo de R$ 10 milhões" },
        { value: "10-50", label: "R$ 10 a 50 milhões" },
        { value: "50-200", label: "R$ 50 a 200 milhões" },
        { value: "above-200", label: "Acima de R$ 200 milhões" }
      ]
    },
    {
      question: "Qual o prazo médio de recebimento?",
      options: [
        { value: "0-30", label: "0 a 30 dias" },
        { value: "30-60", label: "30 a 60 dias" },
        { value: "60-90", label: "60 a 90 dias" },
        { value: "90-120", label: "90 a 120 dias" },
        { value: "above-120", label: "Acima de 120 dias" }
      ]
    },
    {
      question: "Qual o ticket médio por cliente?",
      options: [
        { value: "below-10k", label: "Abaixo de R$ 10 mil" },
        { value: "10k-50k", label: "R$ 10 mil a 50 mil" },
        { value: "50k-200k", label: "R$ 50 mil a 200 mil" },
        { value: "above-200k", label: "Acima de R$ 200 mil" }
      ]
    },
    {
      question: "Quantos clientes ativos você possui?",
      options: [
        { value: "below-10", label: "Menos de 10" },
        { value: "10-50", label: "10 a 50" },
        { value: "50-200", label: "50 a 200" },
        { value: "above-200", label: "Mais de 200" }
      ]
    },
    {
      question: "Qual % da receita vem dos 5 maiores clientes?",
      options: [
        { value: "below-30", label: "Menos de 30%" },
        { value: "30-50", label: "30% a 50%" },
        { value: "50-70", label: "50% a 70%" },
        { value: "above-70", label: "Mais de 70%" }
      ]
    },
    {
      question: "Sua empresa exporta?",
      options: [
        { value: "no", label: "Não" },
        { value: "below-2m", label: "Sim, menos de US$ 2 milhões/ano" },
        { value: "above-2m", label: "Sim, acima de US$ 2 milhões/ano" }
      ]
    },
    {
      question: "Já tiveram perdas relevantes por inadimplência?",
      options: [
        { value: "no", label: "Não" },
        { value: "occasional", label: "Ocasionalmente" },
        { value: "frequent", label: "Frequentemente" },
        { value: "major-loss", label: "Sim, perdas significativas" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    setShowResult(true);
  };

  const isEligible = () => {
    // Simple eligibility logic based on key criteria
    const faturamento = answers[0];
    const exports = answers[5];
    
    return (faturamento === "10-50" || faturamento === "50-200" || faturamento === "above-200") ||
           (exports === "above-2m");
  };

  const resetDiagnostic = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const eligible = isEligible();
    
    return (
      <section id="diagnostico" className="py-20 bg-muted/50 dark:bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-card shadow-premium border-0">
              <CardHeader className="text-center pb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  eligible ? 'bg-trust-blue/10' : 'bg-secondary/10'
                }`}>
                  {eligible ? (
                    <CheckCircle className="h-8 w-8 text-trust-blue" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-secondary" />
                  )}
                </div>
                <CardTitle className={`text-2xl ${eligible ? 'text-trust-blue' : 'text-primary'}`}>
                  {eligible ? 'Parabéns! Sua empresa tem perfil' : 'Sua empresa ainda não tem o perfil ideal'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {eligible ? (
                  <div>
                    <p className="text-corporate-gray mb-6 leading-relaxed">
                      Com base no diagnóstico, sua empresa atende aos critérios para contratar 
                      o Seguro de Crédito Empresarial da Coface.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                        onClick={() => window.open(whatsappLink, '_blank')}
                      >
                        Agende sua sessão estratégica com a Hirayama Corretora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        variant="trust" 
                        size="lg" 
                        className="w-full"
                        onClick={() => window.open(whatsappLink, '_blank')}
                      >
                        Receba uma análise gratuita do perfil da sua empresa
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-corporate-gray mb-6 leading-relaxed">
                      Sua empresa ainda não atende aos critérios mínimos para o Seguro de Crédito, 
                      mas a Coface oferece outras soluções que podem ajudar.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="w-full"
                        onClick={() => window.open(whatsappLink, '_blank')}
                      >
                        Conheça o BI Coface (URBA360)
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        variant="trust" 
                        size="lg" 
                        className="w-full"
                        onClick={() => window.open(whatsappLink, '_blank')}
                      >
                        Falar com especialista
                      </Button>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  onClick={resetDiagnostic}
                  className="mt-6 text-corporate-gray hover:text-primary"
                >
                  Refazer diagnóstico
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostico" className="py-12 sm:py-16 md:py-20 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Diagnóstico Online
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto">
            Descubra em 2 minutos se sua empresa tem perfil para o Seguro de Crédito
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <CardTitle className="text-base sm:text-lg md:text-xl text-primary">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </CardTitle>
                <div className="text-xs sm:text-sm text-corporate-gray">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </div>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-gradient-cta h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-5 sm:mb-6">
                {questions[currentQuestion].question}
              </h3>
              
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-2 sm:space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="flex-1 cursor-pointer py-2 text-sm sm:text-base text-corporate-gray hover:text-primary transition-colors"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-6 sm:mt-8 gap-3">
                <Button 
                  variant="ghost" 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="text-corporate-gray text-sm sm:text-base"
                >
                  Anterior
                </Button>
                <Button 
                  variant="hero" 
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="text-sm sm:text-base"
                >
                  {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticSection;