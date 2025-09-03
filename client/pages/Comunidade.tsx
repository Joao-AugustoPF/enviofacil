import { useMemo, useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Package,
  Lightbulb,
  Wrench,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

interface TopicItem {
  id: string;
  title: string;
  author: string;
  datetime: string;
  replies: number;
  status: "aberto" | "resolvido" | "em discussão";
  category: string;
}

const CATEGORIES = [
  {
    key: "Dicas de Envios",
    icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
  },
  {
    key: "Financeiro & Recargas",
    icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
  },
  {
    key: "Integrações & Tecnologia",
    icon: <Wrench className="w-5 h-5 text-indigo-600" />,
  },
  {
    key: "Suporte da Comunidade",
    icon: <Package className="w-5 h-5 text-orange-600" />,
  },
];

const INITIAL_TOPICS: TopicItem[] = [
  {
    id: "t1",
    title: "Melhores práticas para reduzir custos no SEDEX?",
    author: "Ana Silva",
    datetime: "Hoje, 09:30",
    replies: 12,
    status: "em discussão",
    category: "Dicas de Envios",
  },
  {
    id: "t2",
    title: "PIX não compensou na hora, o que fazer?",
    author: "Rafael Lima",
    datetime: "Ontem, 19:14",
    replies: 5,
    status: "aberto",
    category: "Financeiro & Recargas",
  },
  {
    id: "t3",
    title: "Integração com Nuvemshop: mapeamento de SKUs",
    author: "João Pereira",
    datetime: "Ontem, 15:02",
    replies: 8,
    status: "resolvido",
    category: "Integrações & Tecnologia",
  },
  {
    id: "t4",
    title: "Etiqueta rejeitada nos Correios, possíveis causas?",
    author: "Mariana Costa",
    datetime: "2 dias atrás",
    replies: 3,
    status: "aberto",
    category: "Suporte da Comunidade",
  },
];

export default function ComunidadePage() {
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState<TopicItem[]>(INITIAL_TOPICS);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [newBody, setNewBody] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return topics;
    const q = query.toLowerCase();
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.author.toLowerCase().includes(q),
    );
  }, [topics, query]);

  function handlePublish() {
    if (!newTitle.trim() || !newCategory) return;
    const item: TopicItem = {
      id: `t${Date.now()}`,
      title: newTitle.trim(),
      author: "Você",
      datetime: "agora",
      replies: 0,
      status: "aberto",
      category: newCategory,
    };
    setTopics((prev) => [item, ...prev]);
    setNewTitle("");
    setNewCategory(undefined);
    setNewBody("");
    // Dialog fecha via indicador data-state externo (usaremos form reset com click no botão)
    const close = document.getElementById("close-new-topic");
    close?.click();
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-3">
            Comunidade
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Comunidade EnvioFácil
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Compartilhe experiências, tire dúvidas e aprenda com outros
            lojistas.
          </p>
        </div>
      </section>

      {/* Ações principais: busca + criar tópico */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-lg">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Pesquisar na comunidade..."
                className="pl-10 h-11"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6">
                  Criar novo tópico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Novo tópico</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Título
                    </label>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Escreva um título objetivo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Categoria
                    </label>
                    <Select
                      value={newCategory}
                      onValueChange={(v) => setNewCategory(v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.key} value={c.key}>
                            {c.key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Descrição
                    </label>
                    <Textarea
                      rows={5}
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      placeholder="Descreva seu tópico, contexto e o que já tentou"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button id="close-new-topic" variant="outline">
                    Cancelar
                  </Button>
                  <Button
                    onClick={handlePublish}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Publicar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Conteúdo principal: categorias + feed + destaques */}
      <section className="py-6">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6">
          {/* Coluna esquerda (categorias + feed) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Categorias */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Categorias
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {CATEGORIES.map((c) => (
                  <Card
                    key={c.key}
                    className="border-0 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-gray-50 rounded-full w-10 h-10 flex items-center justify-center">
                        {c.icon}
                      </div>
                      <div className="font-medium text-gray-900">{c.key}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tópicos recentes */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Tópicos recentes
              </h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 text-xs text-gray-500 border-b">
                  <div className="col-span-6">Tópico</div>
                  <div className="col-span-2">Autor</div>
                  <div className="col-span-2">Data/hora</div>
                  <div className="col-span-1 text-center">Respostas</div>
                  <div className="col-span-1 text-right md:text-left">
                    Status
                  </div>
                </div>
                <div className="divide-y">
                  {filtered.map((t) => (
                    <a
                      key={t.id}
                      href={`#topico-${t.id}`}
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-12 md:col-span-6">
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {t.title}
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="text-xs text-gray-500 md:hidden mt-1">
                            {t.author} • {t.datetime} • {t.replies} resp.
                          </div>
                        </div>
                        <div className="hidden md:block col-span-2 text-sm text-gray-700">
                          {t.author}
                        </div>
                        <div className="hidden md:block col-span-2 text-sm text-gray-700">
                          {t.datetime}
                        </div>
                        <div className="hidden md:block col-span-1 text-center text-sm text-gray-700">
                          {t.replies}
                        </div>
                        <div className="col-span-12 md:col-span-1 md:text-left text-right">
                          <Badge variant="secondary" className="rounded-full">
                            {t.status}
                          </Badge>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar destaques */}
          <aside className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Mais respondidos da semana
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Como otimizar pacotes para PAC</li>
                  <li>Boas práticas de integração com marketplaces</li>
                  <li>Checklist de postagem sem erros</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Mais curtidos
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Guia: Recargas PIX mais rápidas</li>
                  <li>Como lidar com devoluções</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Novos membros
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Bruna M.</li>
                  <li>Pedro S.</li>
                  <li>Luana R.</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
