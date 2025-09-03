import { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lightbulb,
  Users,
  Heart,
  TrendingUp,
  Home,
  Clock,
  Shield,
  Gift,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";

const cultureValues = [
  {
    icon: Lightbulb,
    title: "Inovação",
    description:
      "Sempre buscamos novas formas de resolver problemas e melhorar a experiência dos nossos clientes.",
  },
  {
    icon: Users,
    title: "Colaboração",
    description:
      "Trabalhamos em equipe, compartilhando conhecimento e apoiando uns aos outros.",
  },
  {
    icon: Heart,
    title: "Foco no Cliente",
    description:
      "O cliente está no centro de tudo que fazemos, desde o desenvolvimento até o suporte.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Profissional",
    description:
      "Investimos no desenvolvimento contínuo da nossa equipe através de treinamentos e mentoria.",
  },
];

const benefits = [
  {
    icon: Home,
    title: "Trabalho Remoto",
    description: "Flexibilidade para trabalhar de onde quiser",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description: "Adapte sua jornada ao seu estilo de vida",
  },
  {
    icon: Shield,
    title: "Plano de Saúde",
    description: "Cobertura completa para você e sua família",
  },
  {
    icon: Gift,
    title: "Bônus por Desempenho",
    description: "Reconhecimento pelos resultados alcançados",
  },
];

const jobAreas = [
  { id: "todas", label: "Todas as áreas" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "comercial", label: "Comercial" },
  { id: "suporte", label: "Suporte" },
  { id: "marketing", label: "Marketing" },
];

const jobListings = [
  {
    id: 1,
    title: "Desenvolvedor Full Stack",
    area: "tecnologia",
    location: "Remoto",
    type: "CLT",
    description:
      "Desenvolver e manter aplicações web usando React, Node.js e TypeScript.",
  },
  {
    id: 2,
    title: "Analista de Suporte",
    area: "suporte",
    location: "Remoto",
    type: "CLT",
    description:
      "Atender clientes, resolver dúvidas técnicas e fornecer suporte via chat e e-mail.",
  },
  {
    id: 3,
    title: "Executivo de Vendas",
    area: "comercial",
    location: "São Paulo",
    type: "CLT",
    description:
      "Prospectar clientes, apresentar soluções e fechar contratos com empresas.",
  },
  {
    id: 4,
    title: "Analista de Marketing Digital",
    area: "marketing",
    location: "Remoto",
    type: "CLT",
    description:
      "Gerenciar campanhas digitais, SEO, redes sociais e análise de dados.",
  },
  {
    id: 5,
    title: "Estagiário de Tecnologia",
    area: "tecnologia",
    location: "São Paulo",
    type: "Estágio",
    description:
      "Auxiliar no desenvolvimento frontend e aprender com nossa equipe.",
  },
  {
    id: 6,
    title: "Gerente de Produto",
    area: "tecnologia",
    location: "Remoto",
    type: "PJ",
    description:
      "Definir roadmap do produto, priorizar funcionalidades e coordenar desenvolvimento.",
  },
];

export default function CarreirasPage() {
  const [selectedArea, setSelectedArea] = useState("todas");

  const filteredJobs =
    selectedArea === "todas"
      ? jobListings
      : jobListings.filter((job) => job.area === selectedArea);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Carreiras
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trabalhe Conosco
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Faça parte do time que está transformando a forma de enviar no
            Brasil.
          </p>
        </div>
      </section>

      {/* Cultura & Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossa Cultura & Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, idx) => (
              <Card
                key={idx}
                className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Benefícios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card
                key={idx}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 text-center">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm text-center">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas Abertas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Vagas Abertas
          </h2>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {jobAreas.map((area) => (
              <Button
                key={area.id}
                variant={selectedArea === area.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedArea(area.id)}
                className="rounded-full"
              >
                {area.label}
              </Button>
            ))}
          </div>

          {/* Lista de vagas */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {job.description}
                  </p>
                  <Button size="sm" className="w-full">
                    Ver vaga
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhuma vaga encontrada para esta área.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Não encontrou uma vaga para você?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Envie seu currículo para nossa base de talentos. Quando surgir uma
            oportunidade que combine com seu perfil, entraremos em contato.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Enviar currículo
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
