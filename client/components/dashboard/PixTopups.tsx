import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PixData, Topup } from "@/context/DashboardContext";
import React from "react";

function StatusBadge({ status }: { status: Topup["status"] }) {
  const cls =
    status === "PAID"
      ? "bg-green-100 text-green-700 border-green-200"
      : status === "PENDING"
        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
        : "bg-red-100 text-red-700 border-red-200";
  return <Badge className={cls}>{status}</Badge>;
}

export function PixTopups({ pix, topups }: { pix: PixData; topups: Topup[] }) {
  const [open, setOpen] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pix.copyPaste);
    } catch {}
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b flex-wrap">
        <h3 className="text-base font-semibold">Recargas PIX</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" aria-label="Gerar QR Code PIX">Gerar QR Code PIX</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>PIX</DialogTitle>
              <DialogDescription>Escaneie o QR Code ou use copia e cola para recarregar seu saldo. Expira em {pix.expiresAt}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex items-center justify-center">
                <img src={pix.qrImage} alt="QR Code PIX" className="h-48 w-48 rounded-lg border" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Copia e Cola</label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={pix.copyPaste} aria-label="Copia e Cola" />
                  <Button onClick={copy} variant="secondary" aria-label="Copiar chave PIX">Copiar</Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Expira em {pix.expiresAt}</p>
              <p className="text-xs text-muted-foreground">Dica: o crédito cai automaticamente após o pagamento.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="px-6 py-4">
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Minhas Recargas</h4>
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
            {topups.map((t, idx) => (
              <TableRow key={t.txid} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.value}</TableCell>
                <TableCell>
                  <StatusBadge status={t.status} />
                </TableCell>
                <TableCell className="font-mono text-xs">{t.txid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
