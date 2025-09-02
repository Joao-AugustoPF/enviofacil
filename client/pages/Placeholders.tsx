import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Placeholder({ title, actionLabel, actionTo, children }: { title: string; actionLabel?: string; actionTo?: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted-foreground">Esta página ainda não possui conteúdo. Continue solicitando para completarmos.</p>
      {children}
      {actionLabel && actionTo ? (
        <div className="mt-6"><Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to={actionTo}>{actionLabel}</Link></Button></div>
      ) : null}
    </section>
  );
}

export function ShipmentsPage() {
  return <Placeholder title="Envios" actionLabel="Criar Envio" actionTo="/shipments/new" />;
}

export function ShipmentsNewPage() {
  return <Placeholder title="Criar Envio"><div className="mt-4 text-sm text-muted-foreground">Formulário em etapas (remetente, destinatário, pacote, cotação, confirmação).</div></Placeholder>;
}

export function TopupsPage() {
  return <Placeholder title="Recargas PIX" actionLabel="Gerar QR Code PIX" actionTo="/dashboard" />;
}

export function FinancePage() {
  return <Placeholder title="Financeiro" />;
}

export function SupportPage() {
  return <Placeholder title="Suporte" actionLabel="Abrir Ticket" actionTo="#" />;
}

export function SettingsPage() {
  return <Placeholder title="Configurações" />;
}

export function IntegrationsPage() {
  return <Placeholder title="Integrações" />;
}
