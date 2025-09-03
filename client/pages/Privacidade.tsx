import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  { id: "introducao", title: "Introdução" },
  { id: "dados-coletados", title: "Quais dados coletamos" },
  { id: "uso-dados", title: "Como utilizamos seus dados" },
  { id: "compartilhamento", title: "Compartilhamento de informações" },
  { id: "seguranca", title: "Proteção e segurança" },
  { id: "direitos-lgpd", title: "Direitos do Usuário (LGPD)" },
  { id: "retencao", title: "Retenção de dados" },
  { id: "alteracoes", title: "Alterações nesta política" },
  { id: "contato", title: "Contato para assuntos de privacidade" },
] as const;

export default function PrivacidadePage() {
  function scrollToId(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-3">
            Privacidade
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Política de Privacidade
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Saiba como tratamos seus dados pessoais dentro do EnvioFácil.
          </p>
        </div>
      </section>

      {/* Índice */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Índice
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToId(s.id)}
                  className="text-left text-gray-700 hover:text-blue-600"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo em acordeão */}
      <section className="py-2 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((s, idx) => (
              <AccordionItem key={s.id} value={s.id}>
                <div id={s.id} />
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900">
                  {idx + 1}. {s.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed text-justify">
                  {s.id === "introducao" && (
                    <p>
                      Esta Política descreve como o EnvioFácil coleta, utiliza,
                      compartilha e protege seus dados pessoais, bem como seus
                      direitos sob a LGPD.
                    </p>
                  )}
                  {s.id === "dados-coletados" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Dados de cadastro (nome, e-mail, CPF/CNPJ, telefone).
                      </li>
                      <li>
                        Dados de envio (endereços, dimensões e peso das
                        encomendas).
                      </li>
                      <li>
                        Dados de uso do sistema (logs, IP, dispositivo,
                        cookies).
                      </li>
                      <li>
                        Dados de pagamento e faturamento quando aplicável.
                      </li>
                    </ul>
                  )}
                  {s.id === "uso-dados" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Prestar e melhorar nossos serviços de envios.</li>
                      <li>Atender solicitações de suporte e comunicação.</li>
                      <li>Prevenção a fraudes e segurança da conta.</li>
                      <li>Cumprimento de obrigações legais e regulatórias.</li>
                    </ul>
                  )}
                  {s.id === "compartilhamento" && (
                    <p>
                      Podemos compartilhar dados com transportadoras, meios de
                      pagamento e provedores de tecnologia estritamente para
                      viabilizar o serviço, sempre sob obrigações contratuais de
                      confidencialidade e segurança.
                    </p>
                  )}
                  {s.id === "seguranca" && (
                    <p>
                      Adotamos medidas técnicas e organizacionais compatíveis
                      com o mercado para proteção dos dados. Nenhuma transmissão
                      é 100% segura, mas trabalhamos continuamente para mitigar
                      riscos.
                    </p>
                  )}
                  {s.id === "direitos-lgpd" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Acesso, correção e exclusão de dados pessoais.</li>
                      <li>
                        Portabilidade, anonimização e informação sobre
                        compartilhamentos.
                      </li>
                      <li>
                        Revogação de consentimento e oposição ao tratamento,
                        quando cabível.
                      </li>
                    </ul>
                  )}
                  {s.id === "retencao" && (
                    <p>
                      Mantemos dados pelo tempo necessário ao cumprimento das
                      finalidades desta Política e de obrigações legais. Após
                      esse período, dados podem ser anonimizados ou eliminados
                      com segurança.
                    </p>
                  )}
                  {s.id === "alteracoes" && (
                    <p>
                      Esta Política pode ser atualizada periodicamente.
                      Manteremos a versão vigente publicada com a respectiva
                      data de revisão.
                    </p>
                  )}
                  {s.id === "contato" && (
                    <p>
                      Para assuntos de privacidade, entre em contato pelo nosso
                      canal dedicado no menu “Contato” ou através do e-mail
                      indicado na plataforma.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" onClick={backToTop}>
              Voltar ao topo
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
