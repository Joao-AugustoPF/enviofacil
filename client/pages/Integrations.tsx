import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type Integracao = {
  id: string;
  nome: string;
  tipo: "correios" | "transportadora" | "marketplace";
  conectado: boolean;
  ultimoSync?: string;
  falhas?: number;
};

function Card({ title, subtitle, children, status }: { title: string; subtitle?: string; children: React.ReactNode; status?: "conectado" | "desconectado" | "erro" }) {
  const statusColor = status === "conectado" ? "text-green-600" : status === "erro" ? "text-red-600" : "text-gray-500";
  const statusText = status ?? "desconectado";
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <span className={`text-xs ${statusColor}`}>{statusText}</span>
      </div>
      {children}
    </div>
  );
}

export default function IntegrationsPage() {
  const { papel, token } = useAuth() as any;
  const isAdmin = papel === "ADMIN";
  const isDono = papel === "DONO";
  const isFuncionario = papel === "FUNCIONARIO";
  const canView = isAdmin || isDono || isFuncionario;
  const canManage = isAdmin; // somente admin interage nesta tela

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Integracao[]>([]);

  const headersAutenticados = useMemo(() => ({
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  }), [token]);

  useEffect(() => {
    // Simula carga
    const t = setTimeout(() => {
      setItems([
        { id: "correios", nome: "Correios", tipo: "correios", conectado: false, falhas: 0 },
        { id: "priv1", nome: "Transportadora X", tipo: "transportadora", conectado: false, falhas: 0 },
        { id: "nuvemshop", nome: "Nuvemshop", tipo: "marketplace", conectado: false },
        { id: "shopify", nome: "Shopify", tipo: "marketplace", conectado: false },
        { id: "shopee", nome: "Shopee", tipo: "marketplace", conectado: false },
      ]);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  function negarAcesso() {
    toast.error("você não tem permissão para acessar esta funcionalidade");
  }

  async function testarConexao(id: string) {
    if (!canManage) return negarAcesso();
    try {
      // await fetch(`/api/integracoes/${id}/testar`, { method: 'POST', headers: headersAutenticados })
      setItems((arr) => arr.map((x) => x.id === id ? { ...x, conectado: true, ultimoSync: new Date().toISOString(), falhas: 0 } : x));
      toast.success("integração conectada com sucesso");
    } catch {
      toast.error("não foi possível conectar, verifique as credenciais");
    }
  }

  async function conectarMarketplace(id: string) {
    if (!canManage) return negarAcesso();
    try {
      // await fetch(`/api/integracoes/${id}/conectar`, { method: 'POST', headers: headersAutenticados })
      setItems((arr) => arr.map((x) => x.id === id ? { ...x, conectado: true, ultimoSync: new Date().toISOString() } : x));
      toast.success("integração conectada com sucesso");
    } catch {
      toast.error("não foi possível conectar, verifique as credenciais");
    }
  }

  if (!isAdmin) {
    return (
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span>🔌</span>
          <h1 className="text-2xl font-bold">Integrações</h1>
        </div>
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          acesso restrito: apenas administradores podem gerenciar integrações.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span>🔌</span>
        <h1 className="text-2xl font-bold">Integrações</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card title="Correios" subtitle="Cartão de postagem / Token" status={items.find(i=>i.id==='correios')?.conectado ? 'conectado' : 'desconectado'}>
            <div className="grid gap-2">
              <input className="border rounded-md px-2 py-1" placeholder="Cartão de postagem" />
              <input className="border rounded-md px-2 py-1" placeholder="Token" />
              <Button variant="secondary" onClick={() => testarConexao('correios')}>Testar conexão</Button>
            </div>
          </Card>

          <Card title="Transportadora X" subtitle="API Key" status={items.find(i=>i.id==='priv1')?.conectado ? 'conectado' : 'desconectado'}>
            <div className="grid gap-2">
              <input className="border rounded-md px-2 py-1" placeholder="API Key" />
              <Button variant="secondary" onClick={() => testarConexao('priv1')}>Testar conexão</Button>
            </div>
          </Card>

          <Card title="Shopify" status={items.find(i=>i.id==='shopify')?.conectado ? 'conectado' : 'desconectado'}>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => conectarMarketplace('shopify')}>Conectar</Button>
          </Card>

          <Card title="Nuvemshop" status={items.find(i=>i.id==='nuvemshop')?.conectado ? 'conectado' : 'desconectado'}>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => conectarMarketplace('nuvemshop')}>Conectar</Button>
          </Card>

          <Card title="Shopee" status={items.find(i=>i.id==='shopee')?.conectado ? 'conectado' : 'desconectado'}>
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => conectarMarketplace('shopee')}>Conectar</Button>
          </Card>
        </div>
      )}

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold mb-2">Logs</h3>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">nenhuma integração configurada</p>
        ) : (
          <div className="space-y-1 text-xs text-muted-foreground">
            {items.map((i) => (
              <div key={i.id}>[{i.ultimoSync ?? "—"}] {i.nome}: {i.conectado ? "conectado" : "desconectado"} {i.falhas ? `• falhas: ${i.falhas}` : ""}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
