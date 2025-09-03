import { useMemo, useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Package,
  FileText,
  RotateCcw,
  CreditCard,
  Settings,
  Users,
  ArrowRight,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

type Article = { id: string; title: string; href: string; category: string };

const POPULAR: Article[] = [
  {
    id: "a1",
    title: "Como gerar minha primeira etiqueta?",
    href: "#",
    category: "Envios e Etiquetas",
  },
  {
    id: "a2",
    title: "Como recarregar saldo via PIX?",
    href: "#",
    category: "Financeiro e Recargas PIX",
  },
  {
    id: "a3",
    title: "Como agendar uma coleta?",
    href: "#",
    category: "Coletas e Declarações",
  },
  {
    id: "a4",
    title: "Como solicitar logística reversa?",
    href: "#",
    category: "Logística Reversa",
  },
];

const CATEGORIES = [
  {
    key: "Envios e Etiquetas",
    icon: <Package className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "Coletas e Declarações",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "Logística Reversa",
    icon: <RotateCcw className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "Financeiro e Recargas PIX",
    icon: <CreditCard className="w-6 h-6 text-green-600" />,
  },
  {
    key: "Configurações e Integrações",
    icon: <Settings className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "Conta e Permissões",
    icon: <Users className="w-6 h-6 text-green-600" />,
  },
];

export default function Ajuda() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return POPULAR.slice(0, 5);
    return POPULAR.filter((a) =>
      a.title.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 5);
  }, [query]);

  const results = useMemo(() => {
    const list = POPULAR.filter(
      (a) =>
        (!selectedCategory || a.category === selectedCategory) &&
        (!query.trim() || a.title.toLowerCase().includes(query.toLowerCase())),
    );
    return list;
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-3">
            Suporte
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Central de Ajuda
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas ou fale com nosso time de
            suporte.
          </p>

          {/* Busca */}
          <div className="mt-8 max-w-2xl mx-auto text-left">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Digite sua dúvida..."
                className="pl-10 h-12 text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {/* Sugestões */}
            {query && (
              <Card className="mt-2 border-0 shadow-lg">
                <CardContent className="p-2">
                  {suggestions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Nenhum artigo encontrado
                    </div>
                  ) : (
                    suggestions.map((s) => (
                      <a
                        key={s.id}
                        href={s.href}
                        className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50"
                      >
                        <span className="text-sm text-gray-700">{s.title}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </a>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => (
              <Card
                key={c.key}
                className={`border-0 shadow-md hover:shadow-lg transition cursor-pointer ${selectedCategory === c.key ? "ring-2 ring-blue-500" : ""}`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === c.key ? null : c.key)
                }
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{c.key}</div>
                    <div className="text-xs text-gray-500">
                      Ver artigos relacionados
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artigos populares / Resultados */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Artigos populares
            </h2>
            {selectedCategory && (
              <Button
                variant="ghost"
                className="text-gray-600"
                onClick={() => setSelectedCategory(null)}
              >
                Limpar filtro
              </Button>
            )}
          </div>

          {/* Estados */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded border border-red-100 mb-6">
              Não foi possível carregar artigos.
            </div>
          )}

          {results.length === 0 && !error ? (
            <div className="p-6 bg-white rounded shadow-sm text-center text-gray-600">
              Nenhum artigo encontrado
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((a) => (
                <a
                  key={a.id}
                  href={a.href}
                  className="group block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{a.category}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Suporte humano */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    Não encontrou o que procura?
                  </div>
                  <div className="text-gray-600 text-sm">
                    Nossa equipe está pronta para ajudar.
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Abrir Ticket de Suporte
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600"
                >
                  Falar pelo WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
