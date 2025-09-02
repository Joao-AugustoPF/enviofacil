import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ShipmentEditPage() {
  const { id } = useParams();
  const { shipments } = useDashboard();
  const { papel } = useAuth() as any;
  const navigate = useNavigate();

  const shipment = useMemo(() => shipments.find((s) => s.order === id), [shipments, id]);
  const status = shipment?.status || "Draft";
  const isPosted = ["Postado","Delivered","In transit","Delivered","Exception"].includes(status);
  const canEditPesoDims = papel === "ADMIN" || papel === "DONO";

  const [form, setForm] = useState({ nome: "", cep: "", rua: "", numero: "", cidade: "", uf: "", pesoKg: "", c: "", l: "", a: "", referencia: "" });

  if (!shipment) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Editar Envio</h1>
        <p className="text-sm text-muted-foreground">Envio não encontrado.</p>
        <Button asChild><Link to="/shipments">Voltar</Link></Button>
      </div>
    );
  }

  function handleSave() {
    toast.success("Alterações salvas");
    navigate(`/shipments/${encodeURIComponent(shipment.order)}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Editar {shipment.order}</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={()=> navigate(-1)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar alterações</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do destinatário</CardTitle>
          <CardDescription>Edite os campos permitidos conforme o status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" value={form.nome} onChange={(e)=> setForm({ ...form, nome: e.target.value })} disabled={isPosted} />
            </div>
            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" value={form.cep} onChange={(e)=> setForm({ ...form, cep: e.target.value })} disabled={isPosted} />
            </div>
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" value={form.cidade} onChange={(e)=> setForm({ ...form, cidade: e.target.value })} disabled={isPosted} />
            </div>
            <div>
              <Label htmlFor="rua">Rua</Label>
              <Input id="rua" value={form.rua} onChange={(e)=> setForm({ ...form, rua: e.target.value })} disabled={isPosted} />
            </div>
            <div>
              <Label htmlFor="numero">Número</Label>
              <Input id="numero" value={form.numero} onChange={(e)=> setForm({ ...form, numero: e.target.value })} disabled={isPosted} />
            </div>
            <div>
              <Label htmlFor="uf">UF</Label>
              <Input id="uf" value={form.uf} onChange={(e)=> setForm({ ...form, uf: e.target.value })} disabled={isPosted} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pacote</CardTitle>
          <CardDescription>Peso e dimensões</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input id="peso" value={form.pesoKg} onChange={(e)=> setForm({ ...form, pesoKg: e.target.value })} disabled={!canEditPesoDims || isPosted} />
            </div>
            <div>
              <Label htmlFor="c">Comprimento (cm)</Label>
              <Input id="c" value={form.c} onChange={(e)=> setForm({ ...form, c: e.target.value })} disabled={!canEditPesoDims || isPosted} />
            </div>
            <div>
              <Label htmlFor="l">Largura (cm)</Label>
              <Input id="l" value={form.l} onChange={(e)=> setForm({ ...form, l: e.target.value })} disabled={!canEditPesoDims || isPosted} />
            </div>
            <div>
              <Label htmlFor="a">Altura (cm)</Label>
              <Input id="a" value={form.a} onChange={(e)=> setForm({ ...form, a: e.target.value })} disabled={!canEditPesoDims || isPosted} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
