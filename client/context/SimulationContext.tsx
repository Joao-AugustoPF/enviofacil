import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  SimulacaoInput,
  SimulacaoResultado,
  OpcaoServicoSimulacao,
} from "@shared/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type SimulationContextValue = {
  atual: SimulacaoResultado | null;
  carregando: boolean;
  calcular: (input: SimulacaoInput) => Promise<void>;
  limpar: () => void;
};

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const [atual, setAtual] = useState<SimulacaoResultado | null>(null);
  const [carregando, setCarregando] = useState(false);

  const calcular = useCallback(
    async (input: SimulacaoInput) => {
      setCarregando(true);
      try {
        // Chamada ao backend (simulada por enquanto)
        // const resp = await fetch('/api/simulacao/calcular', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(input) })
        // const data: OpcaoServicoSimulacao[] = await resp.json()
        await new Promise((r) => setTimeout(r, 700));
        const data: OpcaoServicoSimulacao[] = [
          {
            servico: "SEDEX",
            transportadora: "correios",
            prazo: "até 2 dias úteis",
            preco: 34.9,
            selo: "melhor_prazo",
          },
          {
            servico: "PAC",
            transportadora: "correios",
            prazo: "até 6 dias úteis",
            preco: 22.5,
            preco_original: 26.9,
            selo: "melhor_preco",
          },
          {
            servico: "Jadlog Express",
            transportadora: "jadlog",
            prazo: "até 4 dias úteis",
            preco: 28.7,
          },
        ];
        setAtual({ input, opcoes: data });
      } catch (e) {
        toast.error("não foi possível calcular, tente novamente");
        throw e;
      } finally {
        setCarregando(false);
      }
    },
    [token],
  );

  const limpar = () => setAtual(null);

  const value = useMemo<SimulationContextValue>(
    () => ({ atual, carregando, calcular, limpar }),
    [atual, carregando, calcular],
  );
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx)
    throw new Error(
      "useSimulation deve ser usado dentro de SimulationProvider",
    );
  return ctx;
}
