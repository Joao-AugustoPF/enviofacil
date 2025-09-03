import { useMemo, useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Circle,
  Clock,
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "operational" | "partial" | "down";
  updatedAt: string;
}

interface IncidentItem {
  id: string;
  when: string; // ISO or human string
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  state: "em investigação" | "resolvido" | "monitorando";
}

const formatStatus = (s: ServiceStatus["status"]) => {
  switch (s) {
    case "operational":
      return {
        text: "Operacional",
        color: "text-emerald-600",
        dot: "bg-emerald-500",
      };
    case "partial":
      return { text: "Parcial", color: "text-amber-600", dot: "bg-amber-500" };
    case "down":
      return { text: "Indisponível", color: "text-red-600", dot: "bg-red-500" };
  }
};

export default function StatusPage() {
  // Demo data (poderia vir de API futuramente)
  const [services] = useState<ServiceStatus[]>([
    {
      name: "Envios & Etiquetas",
      status: "operational",
      updatedAt: "Há 2 min",
    },
    {
      name: "Coletas & Declarações",
      status: "operational",
      updatedAt: "Há 2 min",
    },
    { name: "Logística Reversa", status: "partial", updatedAt: "Há 5 min" },
    {
      name: "Financeiro & Recargas PIX",
      status: "operational",
      updatedAt: "Há 1 min",
    },
    {
      name: "Integrações (Correios, Jadlog, Marketplaces)",
      status: "operational",
      updatedAt: "Há 3 min",
    },
  ]);

  const [incidents] = useState<IncidentItem[]>([
    {
      id: "i1",
      when: "Hoje, 10:12",
      title: "Instabilidade em Logística Reversa",
      description:
        "Alguns usuários relataram erro ao solicitar coletas de devolução. Equipe atuou em correção temporária.",
      severity: "medium",
      state: "monitorando",
    },
    {
      id: "i0",
      when: "Ontem, 18:44",
      title: "Atraso na confirmação de recargas PIX",
      description:
        "Confirmações levaram até 10 minutos. Causa identificada em provedor externo e normalizada.",
      severity: "low",
      state: "resolvido",
    },
  ]);

  const overall = useMemo(() => {
    if (services.some((s) => s.status === "down")) return "down" as const;
    if (services.some((s) => s.status === "partial")) return "partial" as const;
    return "operational" as const;
  }, [services]);

  const overallCard = useMemo(() => {
    switch (overall) {
      case "operational":
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          title: "Todos os sistemas operando normalmente",
          bg: "bg-emerald-50",
          ring: "ring-emerald-200",
        };
      case "partial":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          title: "Alguns serviços com instabilidade",
          bg: "bg-amber-50",
          ring: "ring-amber-200",
        };
      case "down":
        return {
          icon: <XCircle className="w-6 h-6 text-red-600" />,
          title: "Indisponibilidade detectada",
          bg: "bg-red-50",
          ring: "ring-red-200",
        };
    }
  }, [overall]);

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-3">
            Status
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Status da Plataforma
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Acompanhe a disponibilidade dos serviços do EnvioFácil em tempo
            real.
          </p>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Card
            className={`border-0 shadow-md ${overallCard.bg} ring-1 ${overallCard.ring}`}
          >
            <CardContent className="p-6 flex items-center gap-3">
              {overallCard.icon}
              <div className="text-gray-900 font-medium">
                {overallCard.title}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Serviços monitorados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => {
              const meta = formatStatus(s.status);
              return (
                <Card key={s.name} className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${meta.dot}`}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {s.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Última atualização: {s.updatedAt}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm ${meta.color}`}>{meta.text}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incidents Timeline */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Histórico de incidentes
          </h2>
          <div className="space-y-4">
            {incidents.map((i) => (
              <Card key={i.id} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      <Circle
                        className={`w-3 h-3 ${
                          i.severity === "high"
                            ? "text-red-500"
                            : i.severity === "medium"
                              ? "text-amber-500"
                              : "text-emerald-500"
                        } fill-current`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <div className="font-medium text-gray-900">
                          {i.title}
                        </div>
                        <Badge variant="secondary" className="rounded-full">
                          {i.state}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {i.description}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {i.when}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts Subscription */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  Quer ser avisado sobre incidentes?
                </div>
                <div className="text-gray-600 text-sm">
                  Receba alertas por e-mail sempre que houver atualizações.
                </div>
              </div>
              <div className="flex w-full md:w-auto gap-3">
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="h-11"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11">
                  Receber alertas por e-mail
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
