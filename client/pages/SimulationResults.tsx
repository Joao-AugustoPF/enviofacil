import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSimulation } from "@/context/SimulationContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Logo({ transportadora }: { transportadora: string }) {
  if (transportadora === "correios")
    return <span className="font-bold text-yellow-500">Correios</span>;
  if (transportadora === "jadlog")
    return <span className="font-bold text-pink-600">Jadlog</span>;
  return <span className="font-bold">{transportadora}</span>;
}

export default function SimulationResultsPage() {
  const { atual, carregando } = useSimulation();
  const navigate = useNavigate();

  const melhorPrecoId = useMemo(() => {
    if (!atual?.opcoes?.length) return null;
    let idx = 0;
    atual.opcoes.forEach((o, i) => {
      if (o.preco < atual.opcoes[idx].preco) idx = i;
    });
    return idx;
  }, [atual]);

  if (carregando) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <span>📄</span>
          <h1 className="text-2xl font-bold">Dados da simulação</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-6 shadow-sm space-y-3"
            >
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!atual) {
    return (
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span>📄</span>
          <h1 className="text-2xl font-bold">Dados da simulação</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          nenhum serviço disponível para os parâmetros informados
        </p>
      </section>
    );
  }

  const { input, opcoes } = atual;

  async function gerarEtiqueta(idx: number) {
    try {
      // await fetch('/api/shipments', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ input, servico: opcoes[idx] }) })
      toast.success("gerando etiqueta...");
      navigate("/envios/novo");
    } catch {
      toast.error("não foi possível calcular, tente novamente");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span>📄</span>
        <h1 className="text-2xl font-bold">Dados da simulação</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Origem</h3>
          <div className="text-sm text-muted-foreground">
            CEP {input.origem.cep}
          </div>
          <div className="text-sm text-muted-foreground">
            {input.origem.cidade ?? "—"} / {input.origem.estado ?? "—"}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Destino</h3>
          <div className="text-sm text-muted-foreground">
            CEP {input.destino.cep}
          </div>
          <div className="text-sm text-muted-foreground">
            {input.destino.cidade ?? "—"} / {input.destino.estado ?? "—"}
          </div>
          {input.destino.rua || input.destino.bairro ? (
            <div className="text-sm text-muted-foreground">
              {input.destino.rua ?? ""}{" "}
              {input.destino.bairro ? `• ${input.destino.bairro}` : ""}
            </div>
          ) : null}
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Pacote</h3>
          <div className="text-sm text-muted-foreground">
            Peso:{" "}
            <span className="font-medium text-foreground">
              {input.pesoKg.toFixed(2)} kg
            </span>
          </div>
          {input.valorDeclarado ? (
            <div className="text-sm text-muted-foreground">
              Seguro:{" "}
              <span className="font-medium text-foreground">
                R$ {input.valorDeclarado.toFixed(2)}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {!opcoes.length ? (
        <p className="text-sm text-muted-foreground">
          nenhum serviço disponível para os parâmetros informados
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {opcoes.map((o, idx) => {
            const selo =
              o.selo || (idx === melhorPrecoId ? "melhor_preco" : undefined);
            return (
              <div
                key={idx}
                className="rounded-xl border bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Logo transportadora={o.transportadora} />
                  <div>
                    <div className="font-semibold">{o.servico}</div>
                    <div className="text-sm text-muted-foreground">
                      {o.prazo}
                    </div>
                  </div>
                  {selo ? (
                    <span
                      className={`ml-auto text-xs rounded-full px-2 py-0.5 ${selo === "melhor_prazo" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {selo === "melhor_prazo"
                        ? "melhor prazo"
                        : "melhor preço"}
                    </span>
                  ) : null}
                </div>
                <div className="text-lg font-bold">
                  R$ {o.preco.toFixed(2)}{" "}
                  {o.preco_original ? (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      R$ {o.preco_original.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <Button
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                  onClick={() => gerarEtiqueta(idx)}
                >
                  Gerar etiqueta
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
