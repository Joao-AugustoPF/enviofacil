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
  { id: "aceitacao", title: "Aceitação dos Termos" },
  { id: "cadastro", title: "Cadastro e Conta" },
  { id: "funcionalidades", title: "Funcionalidades do Serviço" },
  { id: "obrigacoes-usuario", title: "Obrigações do Usuário" },
  { id: "obrigacoes-enviofacil", title: "Obrigações do EnvioFácil" },
  { id: "limitacao", title: "Limitação de Responsabilidade" },
  { id: "pagamentos", title: "Pagamentos e Planos" },
  { id: "cancelamento", title: "Cancelamento e Encerramento" },
  { id: "alteracoes", title: "Alterações nos Termos" },
  { id: "foro", title: "Foro e Legislação Aplicável" },
] as const;

export default function TermosPage() {
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
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Termos de Uso
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Leia atentamente nossos termos antes de utilizar o EnvioFácil.
          </p>
        </div>
      </section>

      {/* Índice/Âncoras */}
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
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {s.id === "introducao" && (
                    <p>
                      Estes Termos de Uso regulam a utilização da plataforma
                      EnvioFácil ("Serviço"). Ao acessar ou usar o Serviço, você
                      concorda com as condições aqui previstas.
                    </p>
                  )}
                  {s.id === "aceitacao" && (
                    <p>
                      O uso do Serviço implica a aceitação integral e irrestrita
                      destes Termos. Caso não concorde, você deve interromper o
                      uso imediatamente.
                    </p>
                  )}
                  {s.id === "cadastro" && (
                    <p>
                      Para utilizar funcionalidades específicas, pode ser
                      necessário criar uma conta, fornecendo informações
                      verdadeiras, completas e atualizadas. Você é responsável
                      por manter a confidencialidade de suas credenciais.
                    </p>
                  )}
                  {s.id === "funcionalidades" && (
                    <p>
                      O EnvioFácil oferece simulação de frete, geração de
                      etiquetas, acompanhamento de envios, integrações e outros
                      recursos que podem ser ajustados ou ampliados ao longo do
                      tempo.
                    </p>
                  )}
                  {s.id === "obrigacoes-usuario" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Fornecer dados corretos e utilizar o Serviço de forma
                        lícita.
                      </li>
                      <li>
                        Respeitar direitos de terceiros e a legislação
                        aplicável.
                      </li>
                      <li>
                        Não tentar acessar áreas não autorizadas ou prejudicar o
                        sistema.
                      </li>
                    </ul>
                  )}
                  {s.id === "obrigacoes-enviofacil" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Empenhar esforços razoáveis para manter o Serviço
                        disponível.
                      </li>
                      <li>
                        Comunicar incidentes relevantes e manutenções
                        programadas.
                      </li>
                      <li>
                        Proteger dados conforme boas práticas e legislação
                        vigente.
                      </li>
                    </ul>
                  )}
                  {s.id === "limitacao" && (
                    <p>
                      O EnvioFácil não se responsabiliza por prejuízos
                      indiretos, lucros cessantes ou danos decorrentes de
                      indisponibilidades, falhas de terceiros ou uso inadequado
                      do Serviço, na máxima extensão permitida por lei.
                    </p>
                  )}
                  {s.id === "pagamentos" && (
                    <p>
                      Planos e cobranças poderão ser atualizados mediante aviso
                      prévio. Tributos e tarifas de parceiros podem ser
                      repassados quando aplicável. Consulte a tabela vigente na
                      plataforma.
                    </p>
                  )}
                  {s.id === "cancelamento" && (
                    <p>
                      Você pode solicitar o encerramento da conta a qualquer
                      momento. O EnvioFácil poderá suspender ou cancelar contas
                      em casos de violação destes Termos ou uso indevido do
                      Serviço.
                    </p>
                  )}
                  {s.id === "alteracoes" && (
                    <p>
                      Podemos atualizar estes Termos para refletir mudanças
                      legais, operacionais ou de produto. A versão vigente será
                      sempre publicada nesta página com a data de atualização.
                    </p>
                  )}
                  {s.id === "foro" && (
                    <p>
                      Estes Termos são regidos pelas leis do Brasil. Fica eleito
                      o foro do domicílio do usuário para dirimir eventuais
                      controvérsias, salvo disposição legal em contrário.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Voltar ao topo */}
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
