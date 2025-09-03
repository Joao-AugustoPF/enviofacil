import { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ArrowRight,
  Mail,
  TrendingUp,
  ShoppingCart,
  Truck,
  Zap,
  Newspaper,
} from "lucide-react";

const categories = [
  { id: "todas", label: "Todas", icon: Newspaper },
  { id: "logistica", label: "Logística", icon: Truck },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "economia", label: "Economia", icon: TrendingUp },
  { id: "tecnologia", label: "Tecnologia", icon: Zap },
  { id: "novidades", label: "Novidades", icon: Newspaper },
];

const featuredArticle = {
  id: 1,
  title: "Como reduzir custos de frete em 2025: Guia completo para e-commerce",
  summary:
    "Descubra estratégias comprovadas para otimizar seus custos logísticos, desde a escolha da transportadora até a negociação de tarifas. Aprenda com casos reais de empresas que conseguiram economias de até 40% nos fretes.",
  date: "20 de Dezembro, 2024",
  category: "logistica",
  image:
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop",
  readTime: "8 min de leitura",
};

const blogArticles = [
  {
    id: 2,
    title: "5 tendências de logística que vão dominar 2025",
    summary:
      "Inteligência artificial, automação e sustentabilidade são as principais tendências que estão transformando o setor logístico.",
    date: "18 de Dezembro, 2024",
    category: "tecnologia",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    readTime: "5 min de leitura",
  },
  {
    id: 3,
    title: "E-commerce: Como calcular o frete correto para cada região",
    summary:
      "Aprenda a calcular custos de envio considerando distância, peso e características regionais para precificar corretamente.",
    date: "15 de Dezembro, 2024",
    category: "ecommerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    readTime: "6 min de leitura",
  },
  {
    id: 4,
    title: "Impacto da inflação nos custos logísticos: como se proteger",
    summary:
      "Entenda como a inflação afeta os preços de frete e descubra estratégias para minimizar o impacto no seu negócio.",
    date: "12 de Dezembro, 2024",
    category: "economia",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    readTime: "7 min de leitura",
  },
  {
    id: 5,
    title: "Logística reversa: Transforme devoluções em vantagem competitiva",
    summary:
      "Descubra como implementar uma logística reversa eficiente que melhora a experiência do cliente e reduz custos.",
    date: "10 de Dezembro, 2024",
    category: "logistica",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
    readTime: "9 min de leitura",
  },
  {
    id: 6,
    title: "Nova funcionalidade: Dashboard de performance logística",
    summary:
      "Conheça nossa nova ferramenta que permite acompanhar métricas de performance e identificar oportunidades de melhoria.",
    date: "8 de Dezembro, 2024",
    category: "novidades",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    readTime: "4 min de leitura",
  },
  {
    id: 7,
    title: "Black Friday: Checklist para preparar sua logística",
    summary:
      "Prepare-se para o maior evento de vendas do ano com dicas essenciais para não quebrar durante o pico de demanda.",
    date: "5 de Dezembro, 2024",
    category: "ecommerce",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=250&fit=crop",
    readTime: "6 min de leitura",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [email, setEmail] = useState("");

  const filteredArticles =
    selectedCategory === "todas"
      ? blogArticles
      : blogArticles.filter((article) => article.category === selectedCategory);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção, integrar com serviço de newsletter
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog EnvioFácil
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Dicas, novidades e conteúdos para simplificar sua operação
            logística.
          </p>
        </div>
      </section>

      {/* Destaque principal */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-full">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-800"
                  >
                    {featuredArticle.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.date}
                  <span className="text-blue-600">•</span>
                  {featuredArticle.readTime}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {featuredArticle.summary}
                </p>
                <Button size="lg" className="w-fit">
                  Ler mais
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de artigos recentes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Artigos Recentes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800 text-xs"
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                    <span className="text-blue-600">•</span>
                    {article.readTime}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ler artigo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhum artigo encontrado para esta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Receba dicas e novidades
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Inscreva-se em nossa newsletter e receba conteúdo exclusivo direto
            no seu e-mail.
          </p>
          <form
            onSubmit={handleNewsletterSignup}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Inscrever-se
            </Button>
          </form>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
