import React, { useMemo, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  FileText,
  Clock as ClockIcon,
  Truck,
  Navigation,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    Draft: {
      cls: "bg-gray-100 text-gray-700 border-gray-200",
      label: "Rascunho",
    },
    Ready: {
      cls: "bg-gray-100 text-gray-700 border-gray-200",
      label: "Aguardando postagem",
    },
    "In transit": {
      cls: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Em trânsito",
    },
    Delivered: {
      cls: "bg-green-100 text-green-700 border-green-200",
      label: "Entregue",
    },
    Exception: {
      cls: "bg-red-100 text-red-700 border-red-200",
      label: "Atrasado/Devolvido",
    },
    "Label generated": {
      cls: "bg-blue-100 text-blue-700 border-blue-200",
      label: "Etiqueta gerada",
    },
    "Pending pickup": {
      cls: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Saiu para entrega",
    },
    Cancelled: {
      cls: "bg-red-100 text-red-700 border-red-200",
      label: "Cancelado",
    },
  };
  const d = map[status] ?? { cls: "bg-gray-100", label: status };
  return <Badge className={d.cls}>{d.label}</Badge>;
}

const ALL_STATUS = [
  "Draft",
  "Ready",
  "In transit",
  "Delivered",
  "Exception",
  "Label generated",
  "Pending pickup",
  "Cancelled",
];

export default function ShipmentsPage() {
  const { shipments } = useDashboard();
  const { papel, lojaAtualId, lojas, permissoes } = useAuth() as any;
  const [q, setQ] = useState("");
  const [statusSet, setStatusSet] = useState<string[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [service, setService] = useState<string>("");
  const [loading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const showStoreCol = papel === "ADMIN" || papel === "DONO";
  const canAdmin = papel === "ADMIN" || papel === "DONO";

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const okStore = lojaAtualId ? s.lojaId === lojaAtualId : true;
      const okQ = q
        ? s.order.toLowerCase().includes(q.toLowerCase()) ||
          s.tracking.toLowerCase().includes(q.toLowerCase())
        : true;
      const okS = statusSet.length ? statusSet.includes(s.status) : true;
      const okD =
        from || to
          ? s.createdAt >= (from || "") && s.createdAt <= (to || "\u007f")
          : true;
      const okSvc = service
        ? ["PAC", "SEDEX", "Expresso"].includes(service)
        : true;
      return okStore && okQ && okS && okD && okSvc;
    });
  }, [shipments, lojaAtualId, q, statusSet, from, to, service]);

  const counts = useMemo(() => {
    return {
      etiqueta: shipments.filter((s) => s.status === "Label generated").length,
      aguardando: shipments.filter(
        (s) => s.status === "Ready" || s.status === "Draft",
      ).length,
      transito: shipments.filter((s) => s.status === "In transit").length,
      saiu: shipments.filter((s) => s.status === "Pending pickup").length,
      entregue: shipments.filter((s) => s.status === "Delivered").length,
      problema: shipments.filter(
        (s) => s.status === "Exception" || s.status === "Cancelled",
      ).length,
    };
  }, [shipments]);

  const steps = [
    {
      key: "etiqueta",
      label: "Etiqueta gerada",
      color: "bg-blue-600",
      count: counts.etiqueta,
      Icon: FileText,
    },
    {
      key: "aguardando",
      label: "Aguardando postagem",
      color: "bg-gray-400",
      count: counts.aguardando,
      Icon: ClockIcon,
    },
    {
      key: "transito",
      label: "Em trânsito",
      color: "bg-yellow-500",
      count: counts.transito,
      Icon: Truck,
    },
    {
      key: "saiu",
      label: "Saiu para entrega",
      color: "bg-yellow-600",
      count: counts.saiu,
      Icon: Navigation,
    },
    {
      key: "entregue",
      label: "Entregue",
      color: "bg-green-600",
      count: counts.entregue,
      Icon: CheckCircle,
    },
    {
      key: "problema",
      label: "Atrasado/Devolvido",
      color: "bg-red-600",
      count: counts.problema,
      Icon: AlertTriangle,
    },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Status dos Envios</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe em tempo real o andamento das suas postagens.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <a href="/shipments/new">Criar Envio</a>
          </Button>
          <ImportCsvDialog
            canImport={
              canAdmin || Boolean(permissoes?.permissao_importacao_lote)
            }
          />
          <Button
            variant="secondary"
            onClick={() => exportCsv(filtered, showStoreCol, lojas)}
          >
            Exportar CSV
          </Button>
        </div>
      </header>

      {/* Pipeline de status */}
      <div className="rounded-xl border bg-white p-4 shadow-sm overflow-x-auto">
        <div className="min-w-max flex items-center gap-4">
          {steps.map((s, idx) => (
            <div key={s.key} className="flex items-center gap-4">
              <div className="flex flex-col items-center min-w-[120px]">
                <div
                  className={`w-10 h-10 ${s.color} text-white rounded-full flex items-center justify-center shadow`}
                >
                  <s.Icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-xs text-center text-gray-700 font-medium">
                  {s.label}
                </div>
                <div className="text-sm font-bold">{s.count}</div>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-0.5 w-10 md:w-20 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <SummaryCard
          label="Etiqueta gerada"
          value={counts.etiqueta}
          icon={FileText}
          color="text-blue-600 bg-blue-50"
        />
        <SummaryCard
          label="Aguardando postagem"
          value={counts.aguardando}
          icon={ClockIcon}
          color="text-gray-600 bg-gray-50"
        />
        <SummaryCard
          label="Em trânsito"
          value={counts.transito}
          icon={Truck}
          color="text-yellow-600 bg-yellow-50"
        />
        <SummaryCard
          label="Saiu para entrega"
          value={counts.saiu}
          icon={Navigation}
          color="text-yellow-700 bg-yellow-50"
        />
        <SummaryCard
          label="Entregue"
          value={counts.entregue}
          icon={CheckCircle}
          color="text-green-600 bg-green-50"
        />
        <SummaryCard
          label="Atrasado/Devolvido"
          value={counts.problema}
          icon={AlertTriangle}
          color="text-red-600 bg-red-50"
        />
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <Input
            placeholder="Buscar por Pedido ou Rastreio"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="md:max-w-xs"
          />
          <StatusFilter selected={statusSet} onChange={setStatusSet} />
          <Select value={service} onValueChange={(v) => setService(v)}>
            <SelectTrigger className="md:w-[160px]">
              <SelectValue placeholder="Serviço" />
            </SelectTrigger>
            <SelectContent>
              {["PAC", "SEDEX", "Expresso"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-label="Data inicial"
            />
            <span className="text-sm text-muted-foreground">até</span>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              aria-label="Data final"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-md bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-sm">
            Algo deu errado.{" "}
            <Button
              variant="secondary"
              onClick={() => {
                setError(null);
              }}
            >
              Tentar novamente
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            Nenhum envio encontrado para os filtros atuais.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {showStoreCol && <TableHead>Loja</TableHead>}
                <TableHead>Pedido</TableHead>
                <TableHead>Destinatário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rastreio</TableHead>
                <TableHead>Última atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s, idx) => (
                <TableRow
                  key={s.order}
                  className={
                    (idx % 2 === 0 ? "bg-white" : "bg-gray-50") + " group"
                  }
                >
                  {showStoreCol && (
                    <TableCell>
                      {lojas.find((l: any) => l.id === s.lojaId)?.nome ??
                        s.lojaId}
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{s.order}</TableCell>
                  <TableCell>{(s as any).recipient ?? "—"}</TableCell>
                  <TableCell>{s.value}</TableCell>
                  <TableCell>
                    <StatusPill status={s.status} />
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {s.tracking}
                  </TableCell>
                  <TableCell>{s.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Ações">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`/shipments/${encodeURIComponent(s.order)}`}>
                            Ver detalhes
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={s.label} target="_blank" rel="noreferrer">
                            Baixar etiqueta
                          </a>
                        </DropdownMenuItem>
                        {canAdmin ? (
                          <DropdownMenuItem
                            onClick={() => window.alert("Reemitir etiqueta")}
                          >
                            Reemitir etiqueta
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem disabled>
                            Reemitir etiqueta
                          </DropdownMenuItem>
                        )}
                        {canAdmin ? (
                          <DropdownMenuItem
                            onClick={() =>
                              window.confirm("Cancelar envio?") &&
                              window.alert("Cancelado")
                            }
                          >
                            Cancelar envio
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem disabled>
                            Cancelar envio
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}

function StatusFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtrar status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ALL_STATUS.map((s) => {
          const checked = selected.includes(s);
          return (
            <DropdownMenuItem key={s} onSelect={(e) => e.preventDefault()}>
              <label className="flex items-center gap-2 w-full">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(v) =>
                    onChange(
                      checked
                        ? selected.filter((x) => x !== s)
                        : [...selected, s],
                    )
                  }
                />
                <span className="text-sm">{s}</span>
              </label>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ImportCsvDialog({ canImport }: { canImport: boolean }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [autoGerar, setAutoGerar] = useState(false);

  function downloadModelo() {
    const header = [
      "remetente_id",
      "destinatario_nome",
      "destinatario_cep",
      "rua",
      "numero",
      "cidade",
      "uf",
      "telefone",
      "email",
      "peso_kg",
      "comprimento_cm",
      "largura_cm",
      "altura_cm",
      "valor_declarado",
      "servicos_adicionais",
      "referencia_externa",
    ];
    const blob = new Blob([header.join(",") + "\n"], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo_envios.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    if (!file) return;
    setTimeout(() => {
      setOpen(false);
      alert("Importação concluída: 10 linhas, 9 criadas, 1 com erro.");
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {canImport ? (
          <Button variant="secondary">Importar em Lote (CSV)</Button>
        ) : (
          <Button variant="secondary" disabled title="Permissão necessária">
            Importar em Lote (CSV)
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar em Lote (CSV)</DialogTitle>
          <DialogDescription>
            Baixe o modelo, preencha e envie o arquivo (até 5MB).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button variant="outline" onClick={downloadModelo}>
            Baixar CSV modelo
          </Button>
          <div>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              aria-label="Selecionar arquivo CSV"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoGerar}
              onChange={(e) => setAutoGerar(e.target.checked)}
            />
            <span>Gerar etiquetas automaticamente após cotação</span>
          </label>
        </div>
        <DialogFooter>
          <Button onClick={handleImport} disabled={!file}>
            Importar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div
      className={`rounded-xl border p-4 bg-white shadow-sm flex items-center gap-3`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

function exportCsv(rows: any[], includeLoja: boolean, lojas: any[]) {
  const header = [
    "pedido",
    "status",
    "valor",
    "custo",
    "margem",
    "rastreio",
    "criado_em",
    "itens",
  ].concat(includeLoja ? ["loja"] : []);
  const lines = rows.map((r) => {
    const cols = [
      r.order,
      r.status,
      r.value,
      r.cost,
      r.margin,
      r.tracking,
      r.createdAt,
      r.items,
    ];
    if (includeLoja)
      cols.push(lojas.find((l: any) => l.id === r.lojaId)?.nome || r.lojaId);
    return cols.map((c) => `"${String(c).split('"').join('""')}"`).join(",");
  });
  const blob = new Blob([header.join(",") + "\n" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "envios.csv";
  a.click();
  URL.revokeObjectURL(url);
}
