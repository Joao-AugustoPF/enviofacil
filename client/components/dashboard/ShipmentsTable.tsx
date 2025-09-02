import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

export function ShipmentsTable({ shipments }: { shipments: Shipment[] }) {
  const { papel, lojas } = useAuth() as any;
  const showStore = papel === 'ADMIN' || papel === 'DONO';
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-base font-semibold">Envios</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {showStore && <TableHead>Loja</TableHead>}
            <TableHead className="min-w-[140px]">Pedido</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Custo</TableHead>
            <TableHead>Margem</TableHead>
            <TableHead>Rastreio</TableHead>
            <TableHead>Etiqueta</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Itens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((s, idx) => (
            <TableRow key={s.order} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {showStore && <TableCell>{lojas.find((l:any)=>l.id===s.lojaId)?.nome ?? s.lojaId}</TableCell>}
              <TableCell className="font-medium">{s.order}</TableCell>
              <TableCell>{s.status}</TableCell>
              <TableCell>{s.value}</TableCell>
              <TableCell>{s.cost}</TableCell>
              <TableCell>{s.margin}</TableCell>
              <TableCell className="font-mono text-xs">{s.tracking}</TableCell>
              <TableCell>
                <Button asChild size="sm" variant="secondary" aria-label={`Baixar etiqueta de ${s.order}`}>
                  <a href={s.label} target="_blank" rel="noreferrer">Baixar</a>
                </Button>
              </TableCell>
              <TableCell>{s.createdAt}</TableCell>
              <TableCell>{s.items}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
