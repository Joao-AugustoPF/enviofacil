import { useEffect, useMemo, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

function Status({ s }: { s: string }) {
  const cls = s === "PAID" ? "bg-green-100 text-green-700 border-green-200" : s === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-red-100 text-red-700 border-red-200";
  return <Badge className={cls}>{s}</Badge>;
}

export default function TopupsPage() {
  const { dashboard, topups, pix } = useDashboard();
  const { papel, permissoes, lojaAtualId } = useAuth() as any;
  const [open, setOpen] = useState(false);
  const [localTopups, setLocalTopups] = useState(topups.filter(t=>!lojaAtualId || t.lojaId===lojaAtualId));

  useEffect(() => setLocalTopups(topups), [topups]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setLocalTopups((list) => list.map((t, i) => (i === 1 && t.status === "PENDING" ? { ...t, status: Math.random() > 0.6 ? "PAID" : t.status } : t)));
    }, 5000);
    return () => clearInterval(id);
  }, [open]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(pix.copyPaste); } catch {}
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Recargas PIX</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" disabled={papel === 'FUNCIONARIO' && !permissoes.financeiro_criar_recarga} title={papel==='FUNCIONARIO'&&!permissoes.financeiro_criar_recarga? 'Permissão necessária':''}>Gerar QR Code PIX</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>PIX</DialogTitle>
              <DialogDescription>Escaneie o QR Code ou use copia e cola. Expira em {pix.expiresAt}. O saldo é atualizado automaticamente após o pagamento.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex items-center justify-center"><img src={pix.qrImage} alt="QR Code" className="h-48 w-48 rounded-lg border" /></div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Copia e Cola</label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={pix.copyPaste} />
                  <Button variant="secondary" onClick={copy}>Copiar</Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Expira em {pix.expiresAt}</p>
              <p className="text-xs text-muted-foreground">O saldo é atualizado automaticamente após o pagamento.</p>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">Saldo Atual</div>
          <div className="text-2xl font-semibold">{dashboard.balance}</div>
        </CardContent>
      </Card>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-base font-semibold">Minhas Cobranças</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>TxID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localTopups.map((t, idx) => (
              <TableRow key={t.txid} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.value}</TableCell>
                <TableCell><Status s={t.status} /></TableCell>
                <TableCell className="font-mono text-xs">{t.txid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
