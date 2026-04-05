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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_ID } from "@/config/site";
import { submitToFormspree } from "@/config/formspree";
import { toast } from "@/components/ui/sonner";
import { Building2, Loader2, MessageSquareText, Send, User } from "lucide-react";

const specialistFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(120, "Máximo de 120 caracteres"),
  email: z.string().trim().email("E-mail inválido"),
  phone: z
    .string()
    .trim()
    .min(10, "Informe o telefone com DDD")
    .max(25, "Máximo de 25 caracteres"),
  companyName: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa")
    .max(200, "Máximo de 200 caracteres"),
  monthlyRevenueRange: z.enum(
    ["prefiro_nao", "ate_300k", "300k_1m", "1m_5m", "acima_5m"],
    { required_error: "Selecione uma opção" },
  ),
  interest: z.enum(["seguro_credito", "bi", "debt_collection", "avaliando"], {
    required_error: "Selecione o principal interesse",
  }),
  message: z
    .string()
    .max(2000, "Máximo de 2000 caracteres")
    .optional()
    .transform((s) => s?.trim() ?? ""),
  consent: z.boolean(),
});

export type SpecialistFormValues = z.infer<typeof specialistFormSchema>;

const defaultValues: SpecialistFormValues = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  monthlyRevenueRange: "prefiro_nao",
  interest: "seguro_credito",
  message: "",
  consent: true,
};

type SpecialistContactDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: string;
};

export function SpecialistContactDialog({ open, onOpenChange, source }: SpecialistContactDialogProps) {
  const form = useForm<SpecialistFormValues>({
    resolver: zodResolver(specialistFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form]);

  async function onSubmit(data: SpecialistFormValues) {
    const payload = {
      _subject: `[Site] Contato — ${data.fullName} (${SITE_ID})`,
      site_id: SITE_ID,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      company_name: data.companyName,
      monthly_revenue_range: data.monthlyRevenueRange,
      interest: data.interest,
      message: data.message || "",
      source: source || "site",
      consent_accepted: data.consent,
    };

    const result = await submitToFormspree(payload);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Recebemos seus dados. Em breve um especialista entra em contato.");
    onOpenChange(false);
    form.reset(defaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92vh,820px)] overflow-y-auto sm:max-w-xl gap-3 p-5 sm:p-6">
        <DialogHeader className="text-center sm:text-center items-center space-y-2 sm:space-y-2.5 px-2 sm:px-8">
          <DialogTitle className="text-2xl sm:text-[1.85rem] font-bold text-primary leading-tight text-balance">
            Fale com um especialista
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm leading-snug text-muted-foreground max-w-md mx-auto">
            Preencha os campos obrigatórios. Usamos essas informações apenas para retornar seu contato sobre seguro de
            crédito e soluções Coface.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <section className="space-y-3 rounded-lg border-2 border-primary/35 bg-muted/25 px-3 py-3 sm:px-3.5 sm:py-3 shadow-sm">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-primary border-b border-primary/20 pb-1.5">
                <User className="h-3.5 w-3.5 text-trust-blue shrink-0" />
                Seus dados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs">Nome *</FormLabel>
                      <FormControl>
                        <Input
                          className="h-9 bg-background text-sm"
                          placeholder="Seu nome"
                          autoComplete="name"
                          {...field}
                        />
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
                        <Input
                          type="email"
                          className="h-9 bg-background text-sm"
                          placeholder="nome@empresa.com.br"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="sm:max-w-md space-y-1.5">
                    <FormLabel className="text-xs">Telefone *</FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 bg-background text-sm"
                        placeholder="(11) 99999-0000"
                        autoComplete="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-3 rounded-lg border-2 border-primary/35 bg-muted/25 px-3 py-3 sm:px-3.5 sm:py-3 shadow-sm">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-primary border-b border-primary/20 pb-1.5">
                <Building2 className="h-3.5 w-3.5 text-trust-blue shrink-0" />
                Empresa
              </h3>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs">Empresa *</FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 bg-background text-sm"
                        placeholder="Razão social ou nome fantasia"
                        autoComplete="organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyRevenueRange"
                render={({ field }) => (
                  <FormItem className="sm:max-w-md space-y-1.5">
                    <FormLabel className="text-xs">Faturamento médio mensal *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-9 bg-background text-sm">
                          <SelectValue placeholder="Selecione a faixa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prefiro_nao">Prefiro não informar</SelectItem>
                        <SelectItem value="ate_300k">Até R$ 300 mil/mês</SelectItem>
                        <SelectItem value="300k_1m">R$ 300 mil a 1 milhão/mês</SelectItem>
                        <SelectItem value="1m_5m">R$ 1 milhão a 5 milhões/mês</SelectItem>
                        <SelectItem value="acima_5m">Acima de R$ 5 milhões/mês</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="space-y-3 rounded-lg border-2 border-primary/35 bg-muted/25 px-3 py-3 sm:px-3.5 sm:py-3 shadow-sm">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-primary border-b border-primary/20 pb-1.5">
                <MessageSquareText className="h-3.5 w-3.5 text-trust-blue shrink-0" />
                O que você busca
              </h3>
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs">Principal interesse *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-9 bg-background text-sm">
                          <SelectValue placeholder="Selecione o tema principal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="seguro_credito">Seguro de crédito empresarial</SelectItem>
                        <SelectItem value="bi">Business Information (URBA360)</SelectItem>
                        <SelectItem value="debt_collection">Debt Collection / cobrança</SelectItem>
                        <SelectItem value="avaliando">Ainda estou avaliando opções</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs">Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex.: volume de vendas a prazo, principais dúvidas, prazo para decidir…"
                        className="min-h-[72px] resize-y bg-background text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2.5 space-y-0 rounded-lg border-2 border-secondary/80 bg-secondary/10 px-3 py-2.5 shadow-sm ring-1 ring-secondary/30">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(c) => field.onChange(c === true)}
                      className="mt-0.5 h-4 w-4 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </FormControl>
                  <div className="space-y-0.5 leading-snug">
                    <FormLabel className="text-[11px] sm:text-xs font-medium text-foreground cursor-pointer">
                      Autorizo receber e-mails e comunicações da Hirayama sobre seguro de crédito e soluções Coface.
                      <span className="block text-[10px] sm:text-[11px] font-normal text-muted-foreground mt-1">
                        Por padrão esta opção vem marcada; desmarque se não quiser receber comunicações.
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="hero"
              size="default"
              className="w-full h-10 text-sm shadow-md"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando solicitação…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar solicitação
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
