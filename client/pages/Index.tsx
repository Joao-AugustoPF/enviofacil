import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ShipmentsTable } from "@/components/dashboard/ShipmentsTable";
import { PixTopups } from "@/components/dashboard/PixTopups";
import { useDashboard } from "@/context/DashboardContext";

export default function Index() {
  const { dashboard, shipments, topups, pix } = useDashboard();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="container py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shipping Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Overview of your shipments and top-ups</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <SummaryCard title="Total (September 2025)" value={dashboard.total} emoji="📦" bg="bg-green-50" />
          <SummaryCard title="Savings" value={dashboard.savings} emoji="💰" bg="bg-blue-50" />
          <SummaryCard title="Balance" value={dashboard.balance} emoji="💳" bg="bg-gray-50" />
          <SummaryCard title="Discrepancies" value={dashboard.discrepancies} emoji="⚠️" bg="bg-orange-50" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8">
          <ShipmentsTable shipments={shipments} />
          <PixTopups pix={pix} topups={topups} />
        </div>
      </section>
    </main>
  );
}
