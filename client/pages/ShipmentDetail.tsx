import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ShipmentDetailPage() {
  const { id } = useParams();
  const { shipments, shipmentDetails } = useDashboard();
  const { papel } = useAuth() as any;
  const navigate = useNavigate();

  const shipment = useMemo(() => shipments.find((s) => s.order === id), [shipments, id]);
  const detail = shipmentDetails[id || ""];
  const canAdmin = papel === "ADMIN" || papel === "DONO";

  if (!shipment) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Envio</h1>
        <p className="text-sm text-muted-foreground">Envio não encontrado.</p>
        <Button asChild><Link to="/shipments">Voltar</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{shipment.order}</h1>
          <div className="text-sm text-muted-foreground">Status: <Badge>{shipment.status}</Badge></div>
        </div>
        <div className="flex gap-2">
          <Button asChild><a href={shipment.label} target="_blank" rel="noreferrer" aria-label="Imprimir etiqueta">Imprimir etiqueta</a></Button>
          {canAdmin ? <ReemitirDialog onConfirm={()=> toast.success("Etiqueta reemitida")}/> : <Button disabled title="Permissão necessária">Reemitir etiqueta</Button>}
          {canAdmin ? <CancelarDialog onConfirm={(motivo)=> toast.success("Envio cancelado")}/> : <Button disabled title="Permissão necessária">Cancelar envio</Button>}
          <Button variant="secondary" asChild><Link to={`/shipments/${encodeURIComponent(shipment.order)}/editar`}>Editar</Link></Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
          <CardDescription>Dados principais do envio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Origem</div>
              <div className="font-medium">{detail?.origin ?? "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Destino</div>
              <div className="font-medium">{detail?.destination ?? "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Peso / Dimensões</div>
              <div className="font-medium">{detail?.weightKg} kg • {detail ? `${detail.dimensionsCm.w}x${detail.dimensionsCm.h}x${detail.dimensionsCm.l} cm` : "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Valor / Serviço</div>
              <div className="font-medium">{shipment.value} • {shipment.status}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-muted-foreground">Links</div>
              <div className="flex gap-3"><a className="text-primary underline" href={shipment.label} target="_blank" rel="noreferrer">Baixar etiqueta</a></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rastreamento">
        <TabsList>
          <TabsTrigger value="rastreamento">Rastreamento</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>
        <TabsContent value="rastreamento">
          <ol className="mt-3 space-y-3">
            {detail?.trackingEvents?.map((ev, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <div className="text-sm font-medium">{ev.status}</div>
                  <div className="text-xs text-muted-foreground">{ev.date}</div>
                  {ev.description ? <div className="text-sm">{ev.description}</div> : null}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4">
            {canAdmin ? (
              <Button onClick={()=> toast.success("Rastreamento atualizado")}>Atualizar rastreio</Button>
            ) : (
              <Button disabled title="Permissão necessária">Atualizar rastreio</Button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="financeiro">
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div className="rounded-md border p-3"><div className="text-muted-foreground">Valor</div><div className="font-semibold">{shipment.value}</div></div>
            <div className="rounded-md border p-3"><div className="text-muted-foreground">Custo</div><div className="font-semibold">{shipment.cost}</div></div>
            <div className="rounded-md border p-3"><div className="text-muted-foreground">Margem</div><div className="font-semibold">{shipment.margin}</div></div>
            <div className="rounded-md border p-3"><div className="text-muted-foreground">Divergências</div><div className="text-xs">Sem divergências</div></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CancelarDialog({ onConfirm }: { onConfirm: (motivo: string)=> void }) {
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancelar envio</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar Envio</DialogTitle>
          <DialogDescription>Tem certeza que deseja cancelar este envio? Esta ação não pode ser desfeita.</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="motivo">Motivo do cancelamento</Label>
          <Input id="motivo" value={motivo} onChange={(e)=> setMotivo(e.target.value)} placeholder="Descreva o motivo" />
        </div>
        <DialogFooter>
          <Button onClick={()=> { if(!motivo){return;} onConfirm(motivo); setOpen(false); }}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReemitirDialog({ onConfirm }: { onConfirm: ()=> void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Reemitir etiqueta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reemitir Etiqueta</DialogTitle>
          <DialogDescription>A etiqueta atual será invalidada.</DialogDescription>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">Custo e valor serão recalculados no backend.</div>
        <DialogFooter>
          <Button onClick={()=> { onConfirm(); setOpen(false); }}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
