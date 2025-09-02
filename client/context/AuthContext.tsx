import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type Papel = "ADMIN" | "DONO" | "FUNCIONARIO";
export type Loja = { id: string; nome: string };
export type Permissoes = { financeiro_criar_recarga?: boolean };
export type User = { id: string; name: string; email: string; papel: Papel };
export type AuthContextValue = {
  token: string | null;
  user: User | null;
  papel: Papel | null;
  lojas: Loja[];
  lojaAtualId: string | null;
  permissoes: Permissoes;
  accountId: string | null;
  accountName: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validate: () => Promise<boolean>;
  setLojaAtualId: (id: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "auth.token";

function mockDelay(ms = 600) {
  return new Promise((r) => setTimeout(r, ms));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);
  const [papel, setPapel] = useState<Papel | null>(null);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [lojaAtualId, setLojaAtualIdState] = useState<string | null>(null);
  const [permissoes, setPermissoes] = useState<Permissoes>({});
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      await mockDelay();
      if (!email || !password) throw new Error("invalid");
      const fakeToken = btoa(`${email}:token`);
      localStorage.setItem(TOKEN_KEY, fakeToken);
      setToken(fakeToken);
      // mock {{auth.me}} based on email keywords
      const role: Papel = email.includes("func") ? "FUNCIONARIO" : email.includes("dono") ? "DONO" : "ADMIN";
      const visiveis: Loja[] = role === "FUNCIONARIO" ? [{ id: "loja2", nome: "Loja Sul" }] : [
        { id: "loja1", nome: "Loja Centro" },
        { id: "loja2", nome: "Loja Sul" },
        { id: "loja3", nome: "Loja Norte" },
      ];
      const meUser: User = { id: "u_1", name: "João Augusto", email, papel: role };
      setUser(meUser);
      setPapel(role);
      setLojas(visiveis);
      const persisted = localStorage.getItem("lojaAtualId");
      const firstId = persisted && visiveis.find(l=>l.id===persisted) ? persisted : visiveis[0]?.id ?? null;
      setLojaAtualIdState(firstId);
      localStorage.setItem("lojaAtualId", firstId ?? "");
      setPermissoes({ financeiro_criar_recarga: role !== "FUNCIONARIO" });
      setAccountId("acc_123");
      setAccountName("Conta Principal");
      toast.success("Login realizado");
    } catch (e) {
      toast.error("Credenciais inválidas");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setPapel(null);
    setLojas([]);
    setLojaAtualIdState(null);
    setPermissoes({});
    setAccountId(null);
    setAccountName(null);
  }, []);

  const validate = useCallback(async () => {
    if (!token) return false;
    setLoading(true);
    try {
      await mockDelay(500);
      setUser((u) => u ?? { id: "u_1", name: "João Augusto", email: "user@example.com", papel: "ADMIN" });
      setPapel((p) => p ?? "ADMIN");
      setLojas((l) => (l.length ? l : [{ id: "loja1", nome: "Loja Centro" }, { id: "loja2", nome: "Loja Sul" }]));
      setLojaAtualIdState((id)=> id ?? (localStorage.getItem("lojaAtualId") || "loja1"));
      setPermissoes((perm)=> Object.keys(perm).length ? perm : { financeiro_criar_recarga: true });
      setAccountId((a) => a ?? "acc_123");
      setAccountName((n) => n ?? "Conta Principal");
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token && !user) validate();
  }, [token, user, validate]);

  const setLojaAtualId = (id: string) => {
    setLojaAtualIdState(id);
    localStorage.setItem("lojaAtualId", id);
  };

  const value = useMemo<AuthContextValue>(() => ({ token, user, papel, lojas, lojaAtualId, permissoes, accountId, accountName, loading, login, logout, validate, setLojaAtualId }), [token, user, papel, lojas, lojaAtualId, permissoes, accountId, accountName, loading, login, logout, validate]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
