import { useState, useEffect } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

const cookieTypes = [
  {
    id: "essenciais",
    title: "Cookies Essenciais",
    icon: "⚙️",
    description:
      "Necessários para o funcionamento básico do site. Não podem ser desabilitados.",
    examples: ["Autenticação", "Segurança", "Sessão do usuário"],
  },
  {
    id: "desempenho",
    title: "Cookies de Desempenho",
    icon: "📈",
    description:
      "Coletam informações sobre como você usa o site para melhorar a experiência.",
    examples: ["Análise de uso", "Tempo de carregamento", "Erros"],
  },
  {
    id: "marketing",
    title: "Cookies de Marketing",
    icon: "🎯",
    description: "Usados para mostrar anúncios relevantes e medir campanhas.",
    examples: ["Publicidade personalizada", "Redes sociais", "Analytics"],
  },
  {
    id: "preferencias",
    title: "Cookies de Preferências",
    icon: "🎨",
    description: "Lembram suas escolhas para personalizar a experiência.",
    examples: ["Idioma", "Tema", "Configurações"],
  },
];

export default function CookiesPage() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Simula verificação de consentimento (em produção, verificar localStorage/cookies)
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
  };

  const configurePreferences = () => {
    // Em produção, abrir modal de configuração
    console.log("Abrir configurações de cookies");
  };

  const learnMore = () => {
    // Scroll para seção de tipos de cookies
    document
      .getElementById("tipos-cookies")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-3">
            Cookies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Política de Cookies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Entenda como utilizamos cookies para melhorar sua experiência.
          </p>
        </div>
      </section>

      {/* O que são cookies */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que são cookies?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cookies são pequenos arquivos de texto que são armazenados no seu
              dispositivo quando você visita nosso site. Eles nos ajudam a
              lembrar suas preferências, analisar o tráfego e personalizar
              conteúdo.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de cookies */}
      <section id="tipos-cookies" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tipos de cookies que utilizamos
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((type) => (
              <Card key={type.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{type.icon}</span>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Exemplos:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gerenciar cookies */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Como gerenciar cookies
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  No seu navegador
                </h3>
                <p className="text-gray-600 mb-4">
                  Você pode configurar seu navegador para recusar cookies ou ser
                  notificado quando um cookie for enviado.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Chrome:</strong> Configurações → Privacidade →
                    Cookies
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Firefox:</strong> Opções → Privacidade → Cookies
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Safari:</strong> Preferências → Privacidade →
                    Cookies
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Edge:</strong> Configurações → Cookies e permissões
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Consentimento e alterações
                </h3>
                <p className="text-gray-600">
                  Você pode alterar suas preferências de cookies a qualquer
                  momento através das configurações do site ou entrando em
                  contato conosco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dúvidas sobre cookies?
          </h2>
          <p className="text-gray-600 mb-6">
            Se você tiver dúvidas sobre nossa política de cookies ou quiser
            alterar suas preferências, entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default">Falar com suporte</Button>
            <Button variant="outline">Ver política de privacidade</Button>
          </div>
        </div>
      </section>

      <PublicFooter />

      {/* Banner de consentimento */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  O EnvioFácil utiliza cookies para melhorar sua experiência.
                  <button
                    onClick={learnMore}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Saiba mais
                  </button>
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={configurePreferences}
                >
                  Configurar preferências
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  Aceitar todos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
