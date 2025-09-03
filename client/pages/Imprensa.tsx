import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Image,
  Calendar,
  Newspaper,
} from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title:
      "EnvioFácil anuncia parceria com principais transportadoras do Brasil",
    date: "15 de Dezembro, 2024",
    summary:
      "Nova parceria garante cobertura nacional e preços competitivos para clientes da plataforma.",
    link: "#",
    type: "Comunicado",
  },
  {
    id: 2,
    title: "EnvioFácil atinge marca de 100 mil usuários ativos",
    date: "28 de Novembro, 2024",
    summary:
      "Plataforma de envios celebra crescimento expressivo e reforça posição no mercado brasileiro.",
    link: "#",
    type: "Notícia",
  },
  {
    id: 3,
    title: "Lançamento da funcionalidade de logística reversa",
    date: "10 de Novembro, 2024",
    summary:
      "Nova ferramenta permite gerenciar devoluções de forma simples e eficiente.",
    link: "#",
    type: "Lançamento",
  },
  {
    id: 4,
    title: "EnvioFácil recebe investimento de R$ 5 milhões",
    date: "25 de Outubro, 2024",
    summary:
      "Recursos serão destinados ao desenvolvimento de novas funcionalidades e expansão da equipe.",
    link: "#",
    type: "Comunicado",
  },
];

const pressKitItems = [
  {
    icon: Image,
    title: "Logo Oficial",
    description: "PNG e SVG em alta resolução",
    formats: ["PNG", "SVG"],
    downloadUrl: "#",
  },
  {
    icon: FileText,
    title: "Manual de Identidade",
    description: "Guia completo de uso da marca",
    formats: ["PDF"],
    downloadUrl: "#",
  },
  {
    icon: Image,
    title: "Fotos Institucionais",
    description: "Imagens da equipe e escritório",
    formats: ["JPG", "PNG"],
    downloadUrl: "#",
  },
];

const mediaCoverage = [
  {
    name: "TechCrunch Brasil",
    logo: "TC",
    article: "Startup brasileira revoluciona mercado de envios",
    link: "#",
  },
  {
    name: "StartSe",
    logo: "SS",
    article: "EnvioFácil: a nova aposta do e-commerce brasileiro",
    link: "#",
  },
  {
    name: "Exame",
    logo: "EX",
    article: "Como uma startup está democratizando o frete no Brasil",
    link: "#",
  },
  {
    name: "Valor Econômico",
    logo: "VE",
    article: "EnvioFácil recebe investimento para expansão",
    link: "#",
  },
  {
    name: "Revista PEGN",
    logo: "PG",
    article: "5 startups que estão mudando a logística brasileira",
    link: "#",
  },
  {
    name: "Portal B2B",
    logo: "B2",
    article: "Tecnologia que simplifica envios para empresas",
    link: "#",
  },
];

export default function ImprensaPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Imprensa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sala de Imprensa
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Notícias, comunicados e materiais oficiais do EnvioFácil.
          </p>
        </div>
      </section>

      {/* Comunicados & Notícias */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Comunicados & Notícias
          </h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card
                key={release.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {release.type}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {release.date}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {release.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {release.summary}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ler mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kit de Imprensa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kit de Imprensa
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pressKitItems.map((item, idx) => (
              <Card
                key={idx}
                className="bg-white text-center hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {item.formats.map((format) => (
                      <Badge
                        key={format}
                        variant="secondary"
                        className="text-xs"
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato para Imprensa */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">
                Contato para Imprensa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-blue-100 mb-6 text-lg">
                Entre em contato com nossa equipe de comunicação
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-100">
                    imprensa@enviofacil.com.br
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-100">+55 (11) 99999-9999</span>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Falar com Assessoria
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mídia & Cobertura */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Mídia & Cobertura
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mediaCoverage.map((media, idx) => (
              <Card
                key={idx}
                className="bg-white hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-gray-600 text-lg">
                        {media.logo}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-gray-900">
                      {media.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {media.article}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver matéria
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
