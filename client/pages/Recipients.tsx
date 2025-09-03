import React, { useMemo, useState } from "react";
import { useDashboard, SavedRecipient } from "@/context/DashboardContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function RecipientsPage() {
  const {
    recipients,
    addRecipient,
    updateRecipient,
    removeRecipient,
    importRecipients,
    exportRecipients,
  } = useDashboard();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SavedRecipient | null>(null);
  const [form, setForm] = useState<Omit<SavedRecipient, "id" | "ultimoEnvio">>({
    nome: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    observacoes: "",
  });

  const filtered = useMemo(() => {
    const qq = q.toLowerCase();
    return recipients.filter((r) =>
      [r.nome, r.cpfCnpj, r.telefone, r.email, r.cidade, r.uf, r.cep].some(
        (v) => (v || "").toLowerCase().includes(qq),
      ),
    );
  }, [recipients, q]);

  function resetForm() {
    setForm({
      nome: "",
      cpfCnpj: "",
      telefone: "",
      email: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      observacoes: "",
    });
    setEditing(null);
  }

  function openCreate() {
    resetForm();
    setOpen(true);
  }
  function openEdit(r: SavedRecipient) {
    setEditing(r);
    setForm({ ...r });
    setOpen(true);
  }

  function handleSave() {
    if (
      !form.nome ||
      !form.cpfCnpj ||
      !form.telefone ||
      !form.cep ||
      !form.rua ||
      !form.numero ||
      !form.bairro ||
      !form.cidade ||
      !form.uf
    ) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    if (editing) {
      updateRecipient(editing.id, form);
      toast.success("Destinatário atualizado");
    } else {
      addRecipient(form);
      toast.success("Destinatário adicionado");
    }
    setOpen(false);
  }

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const rows = text
        .split(/\r?\n/)
        .slice(1)
        .filter(Boolean)
        .map((line) =>
          line
            .split(",")
            .map((c) => c.replace(/^"|"$/g, "").replace(/""/g, '"')),
        );
      const mapped = rows.map((r) => ({
        nome: r[0],
        cpfCnpj: r[1],
        telefone: r[2],
        email: r[3],
        cep: r[4],
        rua: r[5],
        numero: r[6],
        complemento: r[7],
        bairro: r[8],
        cidade: r[9],
        uf: r[10],
        observacoes: r[11],
      }));
      importRecipients(mapped as any);
      toast.success("Importação concluída");
    };
    reader.readAsText(file);
  }

  function downloadModelo() {
    const header = [
      "nome",
      "cpf_cnpj",
      "telefone",
      "email",
      "cep",
      "rua",
      "numero",
      "complemento",
      "bairro",
      "cidade",
      "uf",
      "observacoes",
    ];
    const blob = new Blob([header.join(",") + "\n"], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo_destinatarios.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Destinatários</h1>
        <p className="text-sm text-muted-foreground">
          Cadastre e gerencie seus destinatários frequentes.
        </p>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Buscar destinatário (nome, cidade, CPF/CNPJ)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full sm:w-80"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={openCreate}>Adicionar novo destinatário</Button>
            <Button variant="outline" onClick={downloadModelo}>
              Modelo CSV
            </Button>
            <Button variant="secondary" onClick={() => exportRecipients()}>
              Exportar CSV
            </Button>
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                  e.target.files?.[0] && handleImport(e.target.files[0])
                }
                className="hidden"
              />
              <span className="px-3 py-2 rounded-md border">Importar CSV</span>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nome</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Último envio</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.nome}</TableCell>
                <TableCell>{r.cpfCnpj}</TableCell>
                <TableCell>{r.telefone}</TableCell>
                <TableCell>{r.email || "—"}</TableCell>
                <TableCell className="text-sm">
                  {`${r.rua}, ${r.numero}${r.complemento ? " - " + r.complemento : ""} • ${r.bairro} • ${r.cidade}/${r.uf} • ${r.cep}`}
                </TableCell>
                <TableCell>{r.ultimoEnvio || "—"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(r)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeRecipient(r.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm text-muted-foreground py-6"
                >
                  Nenhum destinatário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogo add/editar */}
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar destinatário" : "Novo destinatário"}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos obrigatórios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="nome">Nome*</Label>
              <Input
                id="nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF/CNPJ*</Label>
              <Input
                id="cpf"
                value={form.cpfCnpj}
                onChange={(e) => setForm({ ...form, cpfCnpj: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tel">Telefone*</Label>
              <Input
                id="tel"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cep">CEP*</Label>
              <Input
                id="cep"
                inputMode="numeric"
                maxLength={8}
                value={form.cep}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cep: e.target.value.replace(/\D/g, "").slice(0, 8),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="rua">Rua*</Label>
              <Input
                id="rua"
                value={form.rua}
                onChange={(e) => setForm({ ...form, rua: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="numero">Número*</Label>
              <Input
                id="numero"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="compl">Complemento</Label>
              <Input
                id="compl"
                value={form.complemento}
                onChange={(e) =>
                  setForm({ ...form, complemento: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bairro">Bairro*</Label>
              <Input
                id="bairro"
                value={form.bairro}
                onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cidade">Cidade*</Label>
              <Input
                id="cidade"
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="uf">UF*</Label>
              <Input
                id="uf"
                maxLength={2}
                value={form.uf}
                onChange={(e) =>
                  setForm({
                    ...form,
                    uf: e.target.value.toUpperCase().slice(0, 2),
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="obs">Observações</Label>
              <Input
                id="obs"
                value={form.observacoes}
                onChange={(e) =>
                  setForm({ ...form, observacoes: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar destinatário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
