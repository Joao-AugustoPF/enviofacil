import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Timeline({ items }: { items: { pedido: string; status: string; data: string }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <div className="text-sm font-medium">{it.pedido}</div>
                <div className="text-xs text-muted-foreground">{it.status} • {it.data}</div>
              </div>
            </li>
          ))}
          {items.length === 0 ? <div className="text-sm text-muted-foreground">Nenhum dado disponível para o período</div> : null}
        </ol>
      </CardContent>
    </Card>
  );
}
