import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Menu,
  X,
  FileText,
  RotateCcw,
  BarChart3,
  CreditCard,
  Link,
  Users,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";

export default function Funcionalidades() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PublicHeader />
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            ✨ Funcionalidades
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tudo o que você precisa para{" "}
            <span className="text-blue-600">simplificar</span> seus envios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O EnvioFácil reúne em um só lugar as principais ferramentas para
            economizar e gerenciar suas postagens.
          </p>
        </div>
      </section>

      {/* Grid de Funcionalidades */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Package className="w-12 h-12 text-blue-600" />,
                title: "Simulação de frete",
                description:
                  "Compare preços de Correios e transportadoras em segundos",
              },
              {
                icon: <Truck className="w-12 h-12 text-green-600" />,
                title: "Geração de etiquetas",
                description: "Crie etiquetas prontas para imprimir",
              },
              {
                icon: <MapPin className="w-12 h-12 text-purple-600" />,
                title: "Coletas e lotes",
                description:
                  "Organize envios em conjunto e gere documentos automaticamente",
              },
              {
                icon: <FileText className="w-12 h-12 text-orange-600" />,
                title: "Declaração de conteúdo",
                description: "Emita em segundos se não tiver nota fiscal",
              },
              {
                icon: <RotateCcw className="w-12 h-12 text-red-600" />,
                title: "Logística reversa",
                description: "Autorize devoluções e acompanhe retornos",
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-indigo-600" />,
                title: "Dashboard completo",
                description:
                  "Acompanhe gráficos de economia, status e divergências",
              },
              {
                icon: <CreditCard className="w-12 h-12 text-emerald-600" />,
                title: "Recargas pré-pagas",
                description: "Adicione saldo via PIX, boleto ou transferência",
              },
              {
                icon: <Link className="w-12 h-12 text-cyan-600" />,
                title: "Integrações",
                description:
                  "Conecte sua loja (Shopee, Nuvemshop, Shopify, etc.)",
              },
              {
                icon: <Users className="w-12 h-12 text-violet-600" />,
                title: "Usuários e permissões",
                description: "Convide funcionários e defina acessos",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-50 p-3 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experimente todas essas funcionalidades gratuitamente e veja como o
            EnvioFácil pode transformar seus envios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Criar conta grátis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
            >
              Pedir demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">EnvioFácil</h3>
              <p className="text-gray-400 mb-4">
                A plataforma mais inteligente para gestão de envios e redução de
                custos de frete.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/funcionalidades" className="hover:text-white">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="/#precos" className="hover:text-white">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="/#como-funciona" className="hover:text-white">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="/#beneficios" className="hover:text-white">
                    Benefícios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Imprensa
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/#faq" className="hover:text-white">
                    Central de ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Comunidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-700 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 EnvioFácil. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">
                Termos de uso
              </a>
              <a href="#" className="hover:text-white">
                Política de privacidade
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
