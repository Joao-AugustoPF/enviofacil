import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(1, "Informe seu nome completo"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  subject: z.enum(["suporte", "comercial", "parcerias", "outro"], {
    required_error: "Selecione um assunto",
  }),
  message: z.string().min(10, "Escreva uma mensagem (mínimo 10 caracteres)"),
});

type FormValues = z.infer<typeof schema>;

export default function Contato() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: undefined as unknown as FormValues["subject"],
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      // Simula envio (substituir por API quando disponível)
      await new Promise((r) => setTimeout(r, 900));
      toast({ title: "Mensagem enviada com sucesso" });
      form.reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Não foi possível enviar, tente novamente",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Fale Conosco
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a simplificar seus envios.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="seu@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="md:col-span-1">
                            <FormLabel>Telefone (opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="(xx) xxxxx-xxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Assunto</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um assunto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="suporte">Suporte</SelectItem>
                                <SelectItem value="comercial">
                                  Comercial
                                </SelectItem>
                                <SelectItem value="parcerias">
                                  Parcerias
                                </SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Digite sua mensagem..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {submitting ? "Enviando..." : "Enviar mensagem"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contatos diretos */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">
                      E-mail de suporte
                    </div>
                    <div className="font-medium text-gray-900">
                      suporte@enviofacil.com.br
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Telefone/WhatsApp
                    </div>
                    <div className="font-medium text-gray-900">
                      (xx) xxxxx-xxxx
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Endereço</div>
                    <div className="font-medium text-gray-900">
                      Rua Exemplo, 123 - Centro, São Paulo - SP
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapa opcional */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="h-56 w-full">
                  <iframe
                    title="Localização EnvioFácil"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.909640653025!2d-46.633309!3d-23.573307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c9e6b1b1b1%3A0x0000000000000000!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
