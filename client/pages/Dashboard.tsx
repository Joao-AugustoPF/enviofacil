import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ShipmentsTable } from "@/components/dashboard/ShipmentsTable";
import { PixTopups } from "@/components/dashboard/PixTopups";
import { useDashboard } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShipVolumeChart, StatusDonutChart, FinanceChart, TopDestinosBar } from "@/components/dashboard/Charts";
import { Timeline } from "@/components/dashboard/Timeline";

export default function Dashboard() {
  const { dashboard, shipments, topups, pix, shipmentDetails, metricsByStore } = useDashboard() as any;
  const { papel, lojaAtualId, lojas, setLojaAtualId } = useAuth() as any;
  const [consolidado, setConsolidado] = useState(false);

  const [selLojaId, setSelLojaId] = useState<string | "todas">("todas");
  const effectiveStoreId = useMemo(() => {
    if (papel === "ADMIN" && selLojaId === "todas") return null;
    if (papel !== "ADMIN" && selLojaId === "todas") return lojaAtualId; // fallback
    return selLojaId === "todas" ? null : selLojaId;
  }, [selLojaId, lojaAtualId, papel]);

  const metrics = useMemo(() => {
    if ((papel === "ADMIN" || papel === "DONO") && (consolidado || effectiveStoreId === null)) return dashboard;
    return metricsByStore?.[(effectiveStoreId ?? lojaAtualId)!] ?? dashboard;
  }, [papel, consolidado, effectiveStoreId, lojaAtualId, metricsByStore, dashboard]);

  const filteredShip = useMemo(() => shipments.filter((s: any) => !effectiveStoreId ? true : s.lojaId === effectiveStoreId), [shipments, effectiveStoreId]);
  const filteredTop = useMemo(() => topups.filter((t: any) => !effectiveStoreId ? true : t.lojaId === effectiveStoreId), [topups, effectiveStoreId]);

  const dias = Array.from(new Set(filteredShip.map((s:any)=> s.createdAt.slice(0,10)))).sort();
  const enviosPorDia = dias.map((d:string)=> ({ x: d.slice(5), envios: filteredShip.filter((s:any)=> s.createdAt.startsWith(d)).length }));
  const statusMap: Record<string,string> = { Draft:"Rascunho", Ready:"Pronto", "In transit":"Em trânsito", Delivered:"Entregue", Exception:"Exceção", Cancelled:"Cancelado", "Label generated":"Etiqueta gerada", "Pending pickup":"Saiu para entrega" };
  const enviosPorStatus = Object.entries(filteredShip.reduce((acc:any,s:any)=> { const k=statusMap[s.status]||s.status; acc[k]=(acc[k]||0)+1; return acc; },{})).map(([name,value])=> ({ name: String(name), value: Number(value) }));
  const financeDays = dias.map((d:string)=> ({ x: d.slice(5), custos: Math.round(Math.random()*200)+50, receitas: Math.round(Math.random()*300)+100 }));
  const destinosCount = Object.entries((shipmentDetails||{})).reduce((acc:any,[ord,det]:any)=> { if(filteredShip.some((s:any)=> s.order===ord)){ const k=det.destination||"—"; acc[k]=(acc[k]||0)+1; } return acc; },{});
  const topDestinos = Object.entries(destinosCount).sort((a:any,b:any)=> b[1]-a[1]).slice(0,5).map(([nome,qty]:any)=> ({ nome, qty }));
  const ultimosEventos = Object.entries((shipmentDetails||{})).flatMap(([ord,det]:any)=> (det.trackingEvents||[]).slice(-1).map((ev:any)=> ({ pedido: ord, status: ev.status, data: ev.date }))).slice(-5);
  const ultimosEnvios = [...filteredShip].slice(0,10);
  const recargasMes = filteredTop.filter((t:any)=> t.date.slice(0,7) === (new Date().toISOString().slice(0,7))).length;
  const alertas = ["3 envios em atraso","1 divergência financeira em aberto","Saldo abaixo de R$ 50,00"];

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Resumo das suas postagens e movimentações</p>
        </div>
        <div className="w-full sm:w-72">
          <label className="text-sm text-muted-foreground" htmlFor="selLoja">Selecionar Loja</label>
          <Select value={papel==="ADMIN" ? selLojaId : (lojaAtualId||"")} onValueChange={(v)=> {
            if (papel === "ADMIN") {
              if (v === "todas") { setSelLojaId("todas"); setConsolidado(true); }
              else { setSelLojaId(v as any); setConsolidado(false); }
            } else {
              setLojaAtualId(v);
            }
          }}>
            <SelectTrigger id="selLoja"><SelectValue /></SelectTrigger>
            <SelectContent>
              {papel === "ADMIN" ? <SelectItem value="todas">Todas as lojas</SelectItem> : null}
              { (lojas || []).map((l:any)=> (
                <SelectItem key={l.id} value={l.id}>{l.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard title={`Total de Envios (mês)`} value={enviosPorDia.reduce((a,b)=> a + b.envios, 0)} emoji="📦" bg="bg-green-50" />
        <SummaryCard title="Economia Acumulada" value={metrics.savings} emoji="💰" bg="bg-blue-50" />
        <SummaryCard title="Saldo Atual" value={metrics.balance} emoji="💳" bg="bg-gray-50" />
        <SummaryCard title="Divergências" value={metrics.discrepancies} emoji="⚠️" bg="bg-orange-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ShipVolumeChart data={enviosPorDia} />
          <FinanceChart data={financeDays} />
        </div>
        <div className="space-y-6">
          <StatusDonutChart data={enviosPorStatus} />
          <TopDestinosBar data={topDestinos} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-base font-semibold">Últimos Envios</h3>
              <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/shipments/new">Criar Envio</Link></Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Pedido</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Rastreio</TableHead>
                  <TableHead>Criado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ultimosEnvios.map((s:any, idx:number)=> (
                  <TableRow key={s.order} className={idx%2===0?"bg-white":"bg-gray-50"}>
                    <TableCell className="font-medium">{s.order}</TableCell>
                    <TableCell>{s.status}</TableCell>
                    <TableCell>{s.value}</TableCell>
                    <TableCell className="font-mono text-xs">{s.tracking}</TableCell>
                    <TableCell>{s.createdAt}</TableCell>
                  </TableRow>
                ))}
                {ultimosEnvios.length===0 ? <TableRow><TableCell colSpan={5} className="text-sm text-muted-foreground">Nenhum dado disponível para o período</TableCell></TableRow> : null}
              </TableBody>
            </Table>
          </div>
          <PixTopups pix={pix} topups={filteredTop} />
        </div>
        <div className="space-y-6">
          <Timeline items={ultimosEventos} />
          <Card className="rounded-xl border bg-white shadow-sm p-4">
            <h3 className="text-base font-semibold mb-2">Resumo Financeiro</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div><span className="text-muted-foreground">Recargas PIX no mês:</span> {recargasMes}</div>
              <div><span className="text-muted-foreground">Saldo Final:</span> {metrics.balance}</div>
              <div><span className="text-muted-foreground">Economia acumulada:</span> {metrics.savings}</div>
            </div>
          </Card>
          <Card className="rounded-xl border bg-white shadow-sm p-4">
            <h3 className="text-base font-semibold mb-2">Alertas</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {alertas.map((a:string, i:number)=> <li key={i}>{a}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
