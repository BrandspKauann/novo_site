import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=5511972896857&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20seguro%20de%20cr%C3%A9ditos";
  const instagramUrl = "https://www.instagram.com/hirayamaseguros";
  const linkedinUrl = "https://www.linkedin.com/in/ewertonhirayama/";
  const youtubeUrl = "https://www.youtube.com/@HirayamaCorretora";

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => window.open(linkedinUrl, "_blank", "noopener,noreferrer")}
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full p-0 bg-[#0A66C2] hover:bg-[#0958A8] text-white shadow-lg hover:shadow-[#0A66C2]/45 transition-all duration-300 hover:scale-105"
              aria-label="Abrir LinkedIn"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" strokeWidth={2.3} />
              <span className="sr-only">Abrir LinkedIn</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>

        <button
          type="button"
          onClick={() => window.open(youtubeUrl, "_blank", "noopener,noreferrer")}
          className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "#FF0000",
            color: "#FFFFFF",
            opacity: 1,
            boxShadow: "0 10px 18px rgba(255, 0, 0, 0.28)",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#D90000";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "#FF0000";
          }}
          aria-label="Abrir YouTube"
          title="YouTube"
        >
          <SiYoutube
            className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem] shrink-0"
            style={{ color: "#FFFFFF", fill: "#FFFFFF", opacity: 1 }}
          />
          <span className="sr-only">Abrir YouTube</span>
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => window.open(instagramUrl, "_blank", "noopener,noreferrer")}
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full p-0 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110 text-white shadow-lg hover:shadow-[#DD2A7B]/45 transition-all duration-300 hover:scale-105"
              aria-label="Abrir Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" strokeWidth={2.3} />
              <span className="sr-only">Abrir Instagram</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Instagram</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full p-0 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-[#25D366]/45 transition-all duration-300 hover:scale-105"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" strokeWidth={2.3} />
              <span className="sr-only">Falar no WhatsApp</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mb-2">
            <p>Falar no WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
