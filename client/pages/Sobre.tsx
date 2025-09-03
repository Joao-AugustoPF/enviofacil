import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Zap,
  PiggyBank,
  Rocket,
  Headphones,
  Target,
  Eye,
  Users,
} from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Institucional
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Sobre Nós
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça a história e os valores por trás do EnvioFácil
          </p>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Nossa Missão
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Nossa missão é simplificar e reduzir os custos de envios para
                pequenos e médios empreendedores, conectando tecnologia,
                transportadoras e boas práticas logísticas em uma única
                plataforma.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Nossa Visão
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Ser a principal solução de envios do Brasil para quem busca
                praticidade, economia e confiança.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Valores */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Nossos Valores
            </h2>
            <p className="text-gray-600">
              O que guia nossas decisões diariamente
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Shield className="w-7 h-7 text-blue-600" />,
                title: "Transparência",
                desc: "Relações claras e honestas com clientes e parceiros.",
              },
              {
                icon: <Zap className="w-7 h-7 text-indigo-600" />,
                title: "Agilidade",
                desc: "Respostas rápidas e soluções objetivas.",
              },
              {
                icon: <PiggyBank className="w-7 h-7 text-emerald-600" />,
                title: "Economia",
                desc: "Custos menores e mais previsíveis para o cliente.",
              },
              {
                icon: <Rocket className="w-7 h-7 text-purple-600" />,
                title: "Inovação",
                desc: "Melhoria contínua e tecnologia a favor do usuário.",
              },
              {
                icon: <Headphones className="w-7 h-7 text-orange-600" />,
                title: "Atendimento humano",
                desc: "Estamos presentes quando você precisa.",
              },
            ].map((v, i) => (
              <Card key={i} className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-3 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                    {v.icon}
                  </div>
                  <div className="font-semibold text-gray-900">{v.title}</div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {v.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/placeholder.svg"
              alt="Equipe EnvioFácil"
              className="w-full rounded-xl shadow-md"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Nossa História
            </h2>
            <p className="text-gray-600 leading-relaxed">
              O EnvioFácil nasceu com o objetivo de ajudar lojistas a
              profissionalizar sua operação de envios, oferecendo acesso a
              tarifas competitivas, integrações práticas e relatórios claros,
              sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* Equipe (opcional) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Nossa Equipe
              </h2>
              <p className="text-gray-600">Pessoas por trás da plataforma</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { nome: "Ana Silva", funcao: "Fundadora" },
              { nome: "João Pereira", funcao: "Tecnologia" },
              { nome: "Mariana Costa", funcao: "Suporte" },
              { nome: "Rafael Lima", funcao: "Produto" },
            ].map((m, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    {m.nome
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">
                    {m.nome}
                  </div>
                  <div className="text-sm text-gray-600">{m.funcao}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Junte-se a milhares de lojistas que já economizam com o EnvioFácil
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Comece hoje mesmo e veja a diferença nos seus custos de frete.
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
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
            >
              Pedir demonstração
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
