import { useDashboard } from "@/context/DashboardContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function FinancePage() {
  const { transactions, invoices, reconciliation, dashboard } = useDashboard();
  const { papel, lojaAtualId } = useAuth() as any;

  const filteredTx = transactions.filter((t) => !lojaAtualId || t.lojaId === lojaAtualId);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Financeiro</h1>
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          {papel !== "FUNCIONARIO" && <TabsTrigger value="invoices">Faturas de Transportadoras</TabsTrigger>}
          {papel !== "FUNCIONARIO" && <TabsTrigger value="reports">Relatórios</TabsTrigger>}
        </TabsList>

        <TabsContent value="transactions">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Saldo após</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTx.map((t, i) => (
                  <TableRow key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell>{t.reference}</TableCell>
                    <TableCell>{t.value}</TableCell>
                    <TableCell>{t.balanceAfter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {papel !== "FUNCIONARIO" && (
          <TabsContent value="invoices">
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Fatura</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv, i) => (
                    <TableRow key={inv.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell>{inv.id}</TableCell>
                      <TableCell>{inv.period}</TableCell>
                      <TableCell>{inv.total}</TableCell>
                      <TableCell>{inv.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden mt-6">
              <div className="px-6 py-4 border-b font-medium">Itens de Conciliação</div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Fatura</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reconciliation.map((r, i) => (
                    <TableRow key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell>{r.invoiceId}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell>{r.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        )}

        {papel !== "FUNCIONARIO" && (
          <TabsContent value="reports">
            <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="text-sm text-muted-foreground">Período</label>
                  <div className="flex gap-2"><input type="date" className="border rounded-md px-2 py-1" /><input type="date" className="border rounded-md px-2 py-1" /></div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Conta</label>
                  <input className="border rounded-md px-2 py-1 w-full" defaultValue="Conta Principal" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-lg border p-4 bg-gray-50"><div className="text-sm text-muted-foreground">Total gasto</div><div className="text-xl font-semibold">{dashboard.total}</div></div>
                <div className="rounded-lg border p-4 bg-gray-50"><div className="text-sm text-muted-foreground">Economia</div><div className="text-xl font-semibold">{dashboard.savings}</div></div>
                <div className="rounded-lg border p-4 bg-gray-50"><div className="text-sm text-muted-foreground">Margens</div><div className="text-xl font-semibold">—</div></div>
                <div className="rounded-lg border p-4 bg-gray-50"><div className="text-sm text-muted-foreground">Divergências</div><div className="text-xl font-semibold">{dashboard.discrepancies}</div></div>
              </div>
              <Button variant="secondary">Exportar CSV</Button>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
}
