import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Package,
  CreditCard,
  Wallet,
  LifeBuoy,
  Settings,
  Puzzle,
  Users,
  Calculator,
} from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedLayout() {
  const {
    accountName,
    user,
    logout,
    loading,
    token,
    validate,
    lojas,
    lojaAtualId,
    setLojaAtualId,
    papel,
  } = useAuth() as any;
  const { dashboard } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      await validate();
    })();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="container flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="font-extrabold tracking-tight">
              EnvioFácil
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {accountName ?? "Conta"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <label
                className="text-sm text-muted-foreground"
                htmlFor="lojaSel"
              >
                Loja
              </label>
              <select
                id="lojaSel"
                aria-label="Selecionar loja"
                className="border rounded-md px-2 py-1 text-sm"
                value={lojaAtualId ?? ""}
                onChange={(e) => setLojaAtualId(e.target.value)}
              >
                {lojas.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-muted-foreground hidden md:block">
              Saldo:{" "}
              <span className="font-semibold text-foreground">
                {dashboard.balance}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Abrir menu do usuário"
                  className="focus-visible:outline-none"
                >
                  <Avatar>
                    <AvatarFallback>
                      {(user?.name ?? "U").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name ?? "Usuário"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {loading ? <div className="h-0.5 bg-brand animate-pulse" /> : null}
      </header>

      <div className="container grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-6">
        <aside className="hidden md:block">
          <nav className="sticky top-20 space-y-1">
            <NavItem to="/dashboard" icon={<Home className="h-4 w-4" />}>
              Dashboard
            </NavItem>
            <NavItem to="/shipments" icon={<Package className="h-4 w-4" />}>
              Envios
            </NavItem>
            <NavItem to="/simulacao" icon={<Calculator className="h-4 w-4" />}>
              Simular frete
            </NavItem>
            <NavItem to="/topups" icon={<CreditCard className="h-4 w-4" />}>
              Recargas PIX
            </NavItem>
            <NavItem to="/finance" icon={<Wallet className="h-4 w-4" />}>
              Financeiro
            </NavItem>
            <NavItem to="/support" icon={<LifeBuoy className="h-4 w-4" />}>
              Suporte
            </NavItem>
            {papel !== "FUNCIONARIO" ? (
              <NavItem to="/admin" icon={<Users className="h-4 w-4" />}>
                Gestão
              </NavItem>
            ) : null}
            <NavItem to="/settings" icon={<Settings className="h-4 w-4" />}>
              Configurações
            </NavItem>
            <NavItem to="/integrations" icon={<Puzzle className="h-4 w-4" />}>
              Integrações
            </NavItem>
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

function NavItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

function MobileNav() {
  const { papel } = useAuth() as any;
  const showAdmin = papel !== "FUNCIONARIO";
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t md:hidden">
      <div
        className={`grid ${showAdmin ? "grid-cols-7" : "grid-cols-6"} text-xs`}
      >
        <Tab to="/dashboard" label="Home" icon={<Home className="h-5 w-5" />} />
        <Tab
          to="/shipments"
          label="Envios"
          icon={<Package className="h-5 w-5" />}
        />
        <Tab
          to="/simulacao"
          label="Simular"
          icon={<Calculator className="h-5 w-5" />}
        />
        <Tab
          to="/topups"
          label="PIX"
          icon={<CreditCard className="h-5 w-5" />}
        />
        <Tab
          to="/finance"
          label="Finance"
          icon={<Wallet className="h-5 w-5" />}
        />
        {showAdmin ? (
          <Tab
            to="/admin"
            label="Gestão"
            icon={<Users className="h-5 w-5" />}
          />
        ) : null}
        <Tab
          to="/settings"
          label="Config"
          icon={<Settings className="h-5 w-5" />}
        />
      </div>
    </nav>
  );
}

function Tab({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-2 ${isActive ? "text-foreground" : "text-muted-foreground"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
