import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export function ShipVolumeChart({ data }: { data: { x: string; envios: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume de Envios</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="envios" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const STATUS_COLORS = ["#6b7280", "#f59e0b", "#10b981", "#ef4444", "#9ca3af"];

export function StatusDonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Status</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
              {data.map((_, i) => (
                <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function FinanceChart({ data }: { data: { x: string; custos: number; receitas: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financeiro — Custos x Receita</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="custos" fill="#f97316" name="Custo com Transportadoras" />
            <Bar dataKey="receitas" fill="#22c55e" name="Valor Cobrado dos Clientes" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TopDestinosBar({ data }: { data: { nome: string; qty: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Destinos/Origem</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[...data].reverse()} layout="vertical" margin={{ left: 24, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="nome" width={120} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="qty" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
