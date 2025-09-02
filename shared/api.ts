/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Simulação de frete
export interface SimulacaoInput {
  origem: {
    cep: string;
    cidade?: string;
    estado?: string;
  };
  destino: {
    cep: string;
    cidade?: string;
    estado?: string;
    rua?: string;
    bairro?: string;
  };
  pesoKg: number;
  dimensoes: { comprimentoCm: number; larguraCm: number; alturaCm: number };
  valorDeclarado?: number;
}

export interface OpcaoServicoSimulacao {
  servico: string; // "sedex", "pac", "jadlog"
  transportadora: string; // "correios", "jadlog"
  prazo: string; // "até 4 dias úteis"
  preco: number; // total (R$)
  preco_original?: number; // se houver desconto
  selo?: "melhor_prazo" | "melhor_preco";
}

export interface SimulacaoResultado {
  input: SimulacaoInput;
  opcoes: OpcaoServicoSimulacao[];
}
