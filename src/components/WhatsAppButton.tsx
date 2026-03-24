import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.link/d3f6ih";

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full p-0 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl hover:shadow-[#25D366]/45 transition-all duration-300 hover:scale-105 group"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" strokeWidth={2.35} />
            <span className="sr-only">Falar no WhatsApp</span>
            
            {/* Efeito de pulso */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mb-2 mr-2">
          <p>Falar no WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;

