import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SITE_ID } from "@/config/site";
import { submitToFormspree } from "@/config/formspree";
import { toast } from "@/components/ui/sonner";
import { Loader2, Mail, User } from "lucide-react";

const newsletterSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(120, "Máximo de 120 caracteres"),
  email: z.string().trim().email("E-mail inválido"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const defaultValues: NewsletterFormValues = {
  fullName: "",
  email: "",
};

type NewsletterSubscribeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: string;
};

export function NewsletterSubscribeDialog({
  open,
  onOpenChange,
  source,
}: NewsletterSubscribeDialogProps) {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [form, open]);

  async function onSubmit(data: NewsletterFormValues) {
    const payload = {
      _subject: `[Site] Newsletter — ${data.fullName} (${SITE_ID})`,
      site_id: SITE_ID,
      full_name: data.fullName,
      email: data.email,
      source: source || "newsletter",
      interest: "newsletter",
      message: "Inscrição para receber conteúdos exclusivos.",
    };

    const result = await submitToFormspree(payload);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Inscrição realizada. Você vai receber os próximos conteúdos.");
    onOpenChange(false);
    form.reset(defaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-4 p-5 sm:p-6">
        <DialogHeader className="items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-trust-blue/10 text-trust-blue">
            <Mail className="h-5 w-5" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary leading-tight">
            Receba conteúdos exclusivos
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground max-w-sm">
            Preencha apenas seu nome e e-mail para receber materiais sobre proteção de crédito,
            inadimplência e gestão de risco.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs">Nome *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="h-10 bg-background pl-10 text-sm"
                        placeholder="Seu nome"
                        autoComplete="name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs">E-mail *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        className="h-10 bg-background pl-10 text-sm"
                        placeholder="nome@empresa.com.br"
                        autoComplete="email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="trust"
              className="w-full h-10 font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Quero receber"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
