import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function SupportPage() {
  const { shipments, tickets } = useDashboard();
  const { papel, lojaAtualId } = useAuth() as any;
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = tickets.filter((t) =>
    papel === "ADMIN" ? true : t.lojaId === lojaAtualId,
  );
  const sel = filtered.find((t) => t.id === selected);

  return (
    <section className="space-y-6">
      <div className="rounded-md bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
        Para solicitações urgentes, fale conosco no WhatsApp.
      </div>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chamados de suporte</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
              Abrir chamado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Abrir chamado</DialogTitle>
              <DialogDescription>
                Descreva seu problema e inclua o envio relacionado, se
                aplicável.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
                toast.success("Chamado aberto");
              }}
            >
              <div>
                <label className="text-sm">Tipo</label>
                <Select defaultValue="Atraso">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Extravio">Extravio</SelectItem>
                    <SelectItem value="Avaria">Avaria</SelectItem>
                    <SelectItem value="Atraso">Atraso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm">Envio</label>
                <Input
                  list="shipments"
                  placeholder="ID do pedido ou rastreio"
                />
                <datalist id="shipments">
                  {shipments.map((s) => (
                    <option
                      key={s.order}
                      value={`${s.order} / ${s.tracking}`}
                    />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="text-sm">Descrição</label>
                <Textarea className="mt-1" rows={4} />
              </div>
              <div>
                <label className="text-sm">Anexos</label>
                <Input type="file" multiple />
              </div>
              <Button
                type="submit"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Enviar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b font-medium">Meus chamados</div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última atualização</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((t, i) => (
              <TableRow
                key={t.id}
                className={
                  (i % 2 === 0 ? "bg-white" : "bg-gray-50") + " cursor-pointer"
                }
                onClick={() => {
                  setSelected(t.id);
                  setDrawer(true);
                }}
              >
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{t.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Drawer open={drawer} onOpenChange={setDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Chamado {sel?.id}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 text-sm space-y-2">
            <div>
              <span className="font-medium">Tipo:</span> {sel?.type}
            </div>
            <div>
              <span className="font-medium">Status:</span> {sel?.status}
            </div>
            <div>
              <span className="font-medium">Última atualização:</span>{" "}
              {sel?.updatedAt}
            </div>
            <div className="mt-2">
              <div className="font-medium">Histórico</div>
              <ul className="list-disc pl-5 text-xs text-muted-foreground">
                <li>Chamado criado</li>
                <li>Aguardando resposta da transportadora</li>
              </ul>
            </div>
          </div>
          <DrawerFooter>
            <Button variant="secondary" onClick={() => setDrawer(false)}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
