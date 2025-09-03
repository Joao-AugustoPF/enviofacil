import React, { createContext, useContext, useMemo, useState } from "react";

export type DashboardSummary = {
  total: string;
  savings: string;
  balance: string;
  discrepancies: string;
  monthLabel?: string;
};

export type StoreMetrics = Record<string, DashboardSummary>;

export type Shipment = {
  order: string;
  status: string;
  value: string;
  cost: string;
  margin: string;
  tracking: string;
  label: string;
  createdAt: string;
  items: number | string;
  lojaId?: string;
};

export type Topup = {
  date: string;
  value: string;
  status: "PAID" | "PENDING" | "EXPIRED";
  txid: string;
  lojaId?: string;
};

export type PixData = {
  qrImage: string; // base64 image string
  copyPaste: string;
  expiresAt: string;
};

export type TrackingEvent = {
  date: string;
  status: string;
  description?: string;
  location?: string;
};
export type ShipmentDetail = {
  order: string;
  origin: string;
  destination: string;
  weightKg: number;
  dimensionsCm: { w: number; h: number; l: number };
  declaredValue: string;
  extras: string[];
  trackingEvents: TrackingEvent[];
};

export type Transaction = {
  date: string;
  type: "CREDIT" | "DEBIT";
  reference: string;
  value: string;
  balanceAfter: string;
  lojaId?: string;
};
export type Invoice = {
  id: string;
  period: string;
  total: string;
  status: "OPEN" | "PAID" | "PENDING";
};
export type ReconciliationItem = {
  invoiceId: string;
  type: string;
  amount: string;
  notes?: string;
};
export type Ticket = {
  id: string;
  type: "Extravio" | "Avaria" | "Atraso";
  status: "OPEN" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "CLOSED";
  updatedAt: string;
  lojaId?: string;
};

export type SavedRecipient = {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  observacoes?: string;
  ultimoEnvio?: string;
};

export type DashboardContextValue = {
  dashboard: DashboardSummary;
  shipments: Shipment[];
  shipmentDetails: Record<string, ShipmentDetail>;
  topups: Topup[];
  pix: PixData;
  setPix: (p: PixData) => void;
  transactions: Transaction[];
  invoices: Invoice[];
  reconciliation: ReconciliationItem[];
  tickets: Ticket[];
  metricsByStore: StoreMetrics;
  recipients: SavedRecipient[];
  addRecipient: (r: Omit<SavedRecipient, "id" | "ultimoEnvio">) => void;
  updateRecipient: (id: string, r: Partial<SavedRecipient>) => void;
  removeRecipient: (id: string) => void;
  importRecipients: (
    rows: Omit<SavedRecipient, "id" | "ultimoEnvio">[],
  ) => void;
  exportRecipients: (rows?: SavedRecipient[]) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

function genId(prefix = "REC"): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [pix, setPix] = useState<PixData>({
    qrImage:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjUwJyBoZWlnaHQ9JzI1MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCBmaWxsPSIjRTlFQkZF" +
      "IiB3aWR0aD0nMjUwJyBoZWlnaHQ9JzI1MCcgcng9JzIycHgnLz48dGV4dCB4PScxMjUnIHk9JzEyNScgZmlsbD0nI0IyQjZDNScgZm9udC1mYW1pbHk9J0ludGVyJyBmb250LXNpemU9" +
      "JzE0JyB0ZXh0LWFuY2hvcj0nY2VudGVyJz5RVjwvdGV4dD48L3N2Zz4=",
    copyPaste:
      "00020101021226890014br.gov.bcb.pix2563qrcode.pix.example/qr1235204000053039865405100.05802BR5920ACME Logistics Ltd6009Sao Paulo62070503***6304ABCD",
    expiresAt: "2025-09-30 23:59",
  });

  const [recipients, setRecipients] = useState<SavedRecipient[]>([
    {
      id: genId(),
      nome: "Maria Souza",
      cpfCnpj: "123.456.789-00",
      telefone: "(11) 91234-5678",
      email: "maria@example.com",
      cep: "01311000",
      rua: "Av. Paulista",
      numero: "1000",
      complemento: "Conj. 1203",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      uf: "SP",
      observacoes: "Preferir horário comercial",
      ultimoEnvio: "2025-08-28",
    },
    {
      id: genId(),
      nome: "Loja ABC Ltda",
      cpfCnpj: "12.345.678/0001-00",
      telefone: "(21) 99876-5432",
      email: "contato@lojabc.com.br",
      cep: "20040002",
      rua: "Rua da Assembleia",
      numero: "200",
      bairro: "Centro",
      cidade: "Rio de Janeiro",
      uf: "RJ",
      ultimoEnvio: "2025-08-15",
    },
  ]);

  const addRecipient = (r: Omit<SavedRecipient, "id" | "ultimoEnvio">) =>
    setRecipients((prev) => [{ id: genId(), ...r }, ...prev]);
  const updateRecipient = (id: string, r: Partial<SavedRecipient>) =>
    setRecipients((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...r } : it)),
    );
  const removeRecipient = (id: string) =>
    setRecipients((prev) => prev.filter((it) => it.id !== id));
  const importRecipients = (
    rows: Omit<SavedRecipient, "id" | "ultimoEnvio">[],
  ) =>
    setRecipients((prev) => [
      ...rows.map((r) => ({ id: genId(), ...r })),
      ...prev,
    ]);
  const exportRecipients = (rows?: SavedRecipient[]) => {
    const list = rows ?? recipients;
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
      "ultimo_envio",
    ];
    const csvRows = list.map((r) =>
      [
        r.nome,
        r.cpfCnpj,
        r.telefone,
        r.email || "",
        r.cep,
        r.rua,
        r.numero,
        r.complemento || "",
        r.bairro,
        r.cidade,
        r.uf,
        r.observacoes || "",
        r.ultimoEnvio || "",
      ]
        .map((c) => `"${String(c).split('"').join('""')}"`)
        .join(","),
    );
    const blob = new Blob([header.join(",") + "\n" + csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "destinatarios.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const value = useMemo<DashboardContextValue>(
    () => ({
      dashboard: {
        total: "R$ 128.420,90",
        savings: "R$ 4.215,30",
        balance: "R$ 12.890,45",
        discrepancies: "3",
        monthLabel: "Setembro 2025",
      },
      shipments: [
        {
          order: "#ORD-10293",
          status: "Delivered",
          value: "$89.90",
          cost: "$56.40",
          margin: "$33.50",
          tracking: "BR1234567890",
          label: "/placeholder.svg",
          createdAt: "2025-09-02 10:12",
          items: 3,
          lojaId: "loja1",
        },
        {
          order: "#ORD-10292",
          status: "In transit",
          value: "$145.00",
          cost: "$98.00",
          margin: "$47.00",
          tracking: "BR1234567881",
          label: "/placeholder.svg",
          createdAt: "2025-09-01 16:30",
          items: 2,
          lojaId: "loja2",
        },
        {
          order: "#ORD-10291",
          status: "Label generated",
          value: "$59.99",
          cost: "$38.20",
          margin: "$21.79",
          tracking: "BR1234567872",
          label: "/placeholder.svg",
          createdAt: "2025-09-01 09:44",
          items: 1,
          lojaId: "loja1",
        },
        {
          order: "#ORD-10290",
          status: "Pending pickup",
          value: "$249.00",
          cost: "$180.00",
          margin: "$69.00",
          tracking: "BR1234567863",
          label: "/placeholder.svg",
          createdAt: "2025-08-31 18:02",
          items: 5,
          lojaId: "loja3",
        },
      ],
      shipmentDetails: {
        "#ORD-10293": {
          order: "#ORD-10293",
          origin: "São Paulo/SP",
          destination: "Rio de Janeiro/RJ",
          weightKg: 2.5,
          dimensionsCm: { w: 20, h: 10, l: 30 },
          declaredValue: "R$ 350,00",
          extras: ["AR"],
          trackingEvents: [
            {
              date: "2025-09-02 10:12",
              status: "Delivered",
              description: "Objeto entregue ao destinatário",
              location: "Rio de Janeiro/RJ",
            },
            {
              date: "2025-09-01 08:00",
              status: "Out for delivery",
              description: "Saiu para entrega",
              location: "Rio de Janeiro/RJ",
            },
          ],
        },
        "#ORD-10292": {
          order: "#ORD-10292",
          origin: "Campinas/SP",
          destination: "Belo Horizonte/MG",
          weightKg: 1.2,
          dimensionsCm: { w: 15, h: 10, l: 20 },
          declaredValue: "R$ 199,90",
          extras: ["Mão Própria"],
          trackingEvents: [
            {
              date: "2025-09-01 16:30",
              status: "In transit",
              description: "Encaminhado para unidade de distribuição",
              location: "Campinas/SP",
            },
          ],
        },
      },
      topups: [
        {
          date: "2025-09-01",
          value: "$500.00",
          status: "PAID",
          txid: "TX-93JSD29",
          lojaId: "loja1",
        },
        {
          date: "2025-08-28",
          value: "$200.00",
          status: "PENDING",
          txid: "TX-92HSD11",
          lojaId: "loja2",
        },
        {
          date: "2025-08-21",
          value: "$100.00",
          status: "EXPIRED",
          txid: "TX-88GGD70",
          lojaId: "loja3",
        },
      ],
      pix,
      setPix,
      transactions: [
        {
          date: "2025-09-01 12:00",
          type: "CREDIT",
          reference: "Top-up TX-93JSD29",
          value: "+$500.00",
          balanceAfter: "$12,890.45",
          lojaId: "loja1",
        },
        {
          date: "2025-09-01 10:00",
          type: "DEBIT",
          reference: "Shipment #ORD-10292",
          value: "-$98.00",
          balanceAfter: "$12,390.45",
          lojaId: "loja2",
        },
      ],
      invoices: [
        {
          id: "INV-2025-08",
          period: "Aug/2025",
          total: "$2,450.00",
          status: "OPEN",
        },
        {
          id: "INV-2025-07",
          period: "Jul/2025",
          total: "$2,120.00",
          status: "PAID",
        },
      ],
      reconciliation: [
        {
          invoiceId: "INV-2025-08",
          type: "Peso auditado",
          amount: "+$12.00",
          notes: "+200g",
        },
        { invoiceId: "INV-2025-08", type: "Redespacho", amount: "$0.00" },
      ],
      tickets: [
        {
          id: "TCK-1001",
          type: "Atraso",
          status: "OPEN",
          updatedAt: "2025-09-01",
          lojaId: "loja1",
        },
      ],
      metricsByStore: {
        loja1: {
          total: "R$ 80.000,00",
          savings: "R$ 2.000,00",
          balance: "R$ 8.000,00",
          discrepancies: "1",
          monthLabel: "Setembro 2025",
        },
        loja2: {
          total: "R$ 30.000,00",
          savings: "R$ 1.500,00",
          balance: "R$ 3.500,00",
          discrepancies: "2",
          monthLabel: "Setembro 2025",
        },
        loja3: {
          total: "R$ 18.420,90",
          savings: "R$ 715,30",
          balance: "R$ 1.390,45",
          discrepancies: "0",
          monthLabel: "Setembro 2025",
        },
      },
      recipients,
      addRecipient,
      updateRecipient,
      removeRecipient,
      importRecipients,
      exportRecipients,
    }),
    [pix, recipients],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
