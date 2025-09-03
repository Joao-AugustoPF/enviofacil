import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  Truck,
  Package,
  MapPin,
  Eye,
  DollarSign,
  Settings,
  Zap,
  UserCheck,
  Star,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Preciso ter CNPJ para usar o EnvioFácil?",
    answer:
      "Não! O EnvioFácil funciona tanto para pessoas físicas quanto jurídicas. Você pode enviar encomendas usando seu CPF ou CNPJ.",
  },
  {
    question: "Como funciona a reversa?",
    answer:
      "A reversa é um serviço que permite que o destinatário pague o frete na entrega. O EnvioFácil oferece essa opção para maior flexibilidade.",
  },
  {
    question: "Quais transportadoras estão disponíveis?",
    answer:
      "Trabalhamos com Correios, transportadoras regionais e nacionais. Nossa plataforma compara preços automaticamente para você escolher a melhor opção.",
  },
  {
    question: "Posso integrar com minha loja online?",
    answer:
      "Sim! O EnvioFácil oferece integrações com as principais plataformas de e-commerce como Shopify, WooCommerce, Nuvemshop e outras.",
  },
  {
    question: "Como funciona o cálculo de frete?",
    answer:
      "Nossa plataforma consulta automaticamente as tabelas de preços das transportadoras e mostra as opções mais econômicas para cada tipo de envio.",
  },
];

const chartData = Array.from({ length: 12 }).map((_, i) => ({
  x: `${i + 1}`.padStart(2, "0"),
  y: Math.round(10 + Math.random() * 40),
}));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="w-fit">
                🚀 Plataforma líder em envios
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Envie com mais <span className="text-blue-600">economia</span> e{" "}
                <span className="text-blue-600">praticidade</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Reduza até <strong>40%</strong> nos fretes com Correios e
                transportadoras parceiras, sem burocracia. Gestão centralizada
                para todos os seus envios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Criar conta grátis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Pedir demonstração
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Dashboard EnvioFácil
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        R$ 12,50
                      </div>
                      <div className="text-xs text-blue-500">
                        Frete mais barato
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        R$ 18,90
                      </div>
                      <div className="text-xs text-green-500">Correios PAC</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        R$ 25,40
                      </div>
                      <div className="text-xs text-gray-500">
                        Correios SEDEX
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 h-24 rounded-lg flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ left: 8, right: 8 }}
                      >
                        <XAxis dataKey="x" hide />
                        <YAxis hide />
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Em apenas 4 passos simples, você economiza tempo e dinheiro nos
              seus envios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Package className="w-12 h-12 text-blue-600" />,
                title: "Simular frete",
                description: "Compare preços entre transportadoras em segundos",
              },
              {
                icon: <Truck className="w-12 h-12 text-green-600" />,
                title: "Gerar etiqueta",
                description: "Crie etiquetas profissionais com um clique",
              },
              {
                icon: <MapPin className="w-12 h-12 text-purple-600" />,
                title: "Postar",
                description: "Envie de qualquer agência ou agende coleta",
              },
              {
                icon: <Eye className="w-12 h-12 text-orange-600" />,
                title: "Acompanhar",
                description: "Monitore todos os seus envios em tempo real",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-50 p-4 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o EnvioFácil?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Benefícios exclusivos que fazem a diferença no seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <DollarSign className="w-10 h-10 text-green-600" />,
                title: "Economia garantida",
                description:
                  "Reduza custos de frete com nossa tecnologia de comparação inteligente",
              },
              {
                icon: <Settings className="w-10 h-10 text-blue-600" />,
                title: "Gestão centralizada",
                description:
                  "Controle todos os envios em uma única plataforma intuitiva",
              },
              {
                icon: <Zap className="w-10 h-10 text-purple-600" />,
                title: "Integrações automáticas",
                description:
                  "Conecte com suas lojas online e sistemas de gestão",
              },
              {
                icon: <UserCheck className="w-10 h-10 text-orange-600" />,
                title: "Sem necessidade de CNPJ",
                description: "Funciona para pessoas físicas e jurídicas",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Provas Sociais */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Confiado por milhares de empresas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes dizem sobre a experiência com o
              EnvioFácil
            </p>
          </div>

          {/* Números de impacto */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "+10.000", label: "Etiquetas geradas" },
              { number: "+2.500", label: "Clientes ativos" },
              { number: "R$ 500k+", label: "Economizados" },
              { number: "99.8%", label: "Satisfação" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Depoimentos */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Maria Silva",
                company: "Loja Virtual Plus",
                content:
                  "Reduzimos 35% nos custos de frete e ganhamos muito tempo na gestão dos envios.",
                rating: 5,
              },
              {
                name: "João Santos",
                company: "E-commerce Express",
                content:
                  "A integração com nossa loja foi super simples e os resultados apareceram no primeiro mês.",
                rating: 5,
              },
              {
                name: "Ana Costa",
                company: "Moda Online",
                content:
                  "Excelente suporte e plataforma muito intuitiva. Recomendo para qualquer e-commerce.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logos das empresas */}
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              Empresas que confiam no EnvioFácil
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">LOGO 1</div>
              <div className="text-2xl font-bold text-gray-400">LOGO 2</div>
              <div className="text-2xl font-bold text-gray-400">LOGO 3</div>
              <div className="text-2xl font-bold text-gray-400">LOGO 4</div>
              <div className="text-2xl font-bold text-gray-400">LOGO 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tela do Produto */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Dashboard inteligente que facilita sua vida
              </h2>
              <p className="text-xl text-gray-600">
                Visualize todos os seus envios, compare preços e gerencie
                etiquetas em uma interface moderna e responsiva.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Comparação automática de preços
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Gestão centralizada de envios
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Relatórios e analytics em tempo real
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Simulação de Frete
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-blue-900">
                          Transportadora Parceira
                        </div>
                        <div className="text-sm text-blue-700">
                          Entrega em 3-5 dias úteis
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">
                          R$ 12,50
                        </div>
                        <div className="text-sm text-blue-600">
                          Economia de R$ 6,40
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-gray-700">
                        R$ 18,90
                      </div>
                      <div className="text-xs text-gray-500">Correios PAC</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-gray-700">
                        R$ 25,40
                      </div>
                      <div className="text-xs text-gray-500">
                        Correios SEDEX
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section id="precos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comece grátis e escale conforme sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Grátis */}
            <Card className="border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Grátis
                </h3>
                <p className="text-gray-600 mb-6">Perfeito para começar</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  R$ 0
                </div>
                <p className="text-gray-500 mb-8">para sempre</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Até 50 envios/mês</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Simulação de frete</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Geração de etiquetas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Suporte por email</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-600 hover:bg-gray-700">
                  Começar grátis
                </Button>
              </CardContent>
            </Card>

            {/* Plano Pró */}
            <Card className="border-2 border-blue-500 relative bg-blue-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pró</h3>
                <p className="text-gray-600 mb-6">
                  Para negócios em crescimento
                </p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  R$ 49
                </div>
                <p className="text-gray-500 mb-8">por mês</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Envio ilimitado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Integrações com e-commerce
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Relatórios avançados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">API personalizada</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Começar agora
                </Button>
              </CardContent>
            </Card>

            {/* Plano Enterprise */}
            <Card className="border-2 border-gray-200 hover:border-purple-500 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6">Para grandes empresas</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  Personalizado
                </div>
                <p className="text-gray-500 mb-8">sob consulta</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Tudo do plano Pró</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Implementação dedicada
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Gerente de conta</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">SLA personalizado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Treinamento da equipe</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Falar com vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o EnvioFácil
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`q${index + 1}`}>
                  <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Pronto para economizar no frete?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já reduziram custos com o
            EnvioFácil
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Criar conta grátis
            </Button>
            <Button
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg transition-colors"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />

      {/* Botão fixo CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full px-6 py-3">
          Criar conta grátis
        </Button>
      </div>
    </div>
  );
}
