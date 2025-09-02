import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { DashboardProvider } from "@/context/DashboardContext";
import { SimulationProvider } from "@/context/SimulationContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedLayout } from "@/components/layout/AppShell";
import ShipmentsPage from "./pages/Shipments";
import ShipmentNewPage from "./pages/ShipmentNew";
import ShipmentDetailPage from "./pages/ShipmentDetail";
import ShipmentEditPage from "./pages/ShipmentEdit";
import TopupsPage from "./pages/Topups";
import FinancePage from "./pages/Finance";
import SupportPage from "./pages/Support";
import SettingsPage from "./pages/Settings";
import IntegrationsPage from "./pages/Integrations";
import AdminPage from "./pages/Admin";
import SimulationPage from "./pages/Simulation.tsx";
import SimulationResultsPage from "./pages/SimulationResults.tsx";

const queryClient = new QueryClient();

function RootRedirect() {
  const { token } = useAuth();
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DashboardProvider>
            <SimulationProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RootRedirect />} />

                <Route element={<ProtectedLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/shipments" element={<ShipmentsPage />} />
                  <Route path="/shipments/new" element={<ShipmentNewPage />} />
                  <Route
                    path="/shipments/:id"
                    element={<ShipmentDetailPage />}
                  />
                  <Route
                    path="/shipments/:id/editar"
                    element={<ShipmentEditPage />}
                  />
                  <Route path="/envios" element={<ShipmentsPage />} />
                  <Route path="/envios/novo" element={<ShipmentNewPage />} />
                  <Route path="/envios/:id" element={<ShipmentDetailPage />} />
                  <Route
                    path="/envios/:id/editar"
                    element={<ShipmentEditPage />}
                  />
                  <Route path="/topups" element={<TopupsPage />} />
                  <Route path="/finance" element={<FinancePage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/integrations" element={<IntegrationsPage />} />
                  {/** PT-BR aliases */}
                  <Route path="/configuracoes" element={<SettingsPage />} />
                  <Route path="/integracoes" element={<IntegrationsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  {/** Simulação de frete */}
                  <Route path="/simulacao" element={<SimulationPage />} />
                  <Route
                    path="/simulacao/resultados"
                    element={<SimulationResultsPage />}
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </SimulationProvider>
          </DashboardProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
