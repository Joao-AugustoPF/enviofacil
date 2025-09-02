import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

type Endereco = {
  id: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export default function SettingsPage() {
  const { papel, token } = useAuth() as any;
  const isFuncionario = papel === "FUNCIONARIO";
  const canManage = papel === "ADMIN" || papel === "DONO";

  // Perfil
  const [nome, setNome] = useState("João Augusto");
  const [email, setEmail] = useState("user@example.com");
  const [senha, setSenha] = useState("");

  // Endereços
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [novoEndereco, setNovoEndereco] = useState<Endereco>({
    id: "tmp",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const temEnderecos = enderecos.length > 0;

  // Usuários e permissões (mock)
  type LinhaUsuario = { id: string; nome: string; email: string; papel: "DONO" | "ADMIN" | "FUNCIONARIO"; criarEnvios: boolean; verFinanceiro: boolean; gerarRecargaPix: boolean; acessarSuporte: boolean };
  const [usuarios, setUsuarios] = useState<LinhaUsuario[]>([{
    id: "u1", nome: "João Augusto", email: "dono@example.com", papel: "DONO", criarEnvios: true, verFinanceiro: true, gerarRecargaPix: true, acessarSuporte: true,
  }]);
  const [abrirConvite, setAbrirConvite] = useState(false);
  const [conviteEmail, setConviteEmail] = useState("");
  const [convitePerm, setConvitePerm] = useState({ criarEnvios: true, verFinanceiro: false, gerarRecargaPix: false, acessarSuporte: true });

  // Webhooks
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [eventos, setEventos] = useState({
    "envio.criado": true,
    "etiqueta.pronta": true,
    "status.atualizado": true,
    "entregue": true,
    "excecao": false,
  });

  // Regras de preço
  type ModoPreco = "markup_fixo" | "faixas";
  const [modoPreco, setModoPreco] = useState<ModoPreco>("markup_fixo");
  const [markup, setMarkup] = useState(15);
  const [faixas, setFaixas] = useState([
    { ate: 20, perc: 20 },
    { de: 20, ate: 40, perc: 15 },
    { acima: 40, perc: 10 },
  ]);

  const headersAutenticados = useMemo(() => ({
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  }), [token]);

  function somenteNumeros(valor: string) {
    return valor.replace(/\D/g, "");
  }

  async function buscarCep(cep: string) {
    const puro = somenteNumeros(cep);
    if (puro.length !== 8) return;
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${puro}/json/`);
      const data = await resp.json();
      if ((data as any).erro) throw new Error("CEP não encontrado");
      setNovoEndereco((e) => ({
        ...e,
        cep: puro,
        rua: data.logradouro ?? e.rua,
        bairro: data.bairro ?? e.bairro,
        cidade: data.localidade ?? e.cidade,
        uf: data.uf ?? e.uf,
      }));
    } catch (err) {
      toast.error("Não foi possível buscar o CEP");
    }
  }

  function salvarPerfil() {
    // Exemplo com headers de autorização (simulado)
    try {
      // await fetch('/api/perfil', { method: 'POST', headers: headersAutenticados, body: JSON.stringify({ nome, email, senha }) })
      toast.success("configuração salva");
      setSenha("");
    } catch {
      toast.error("não foi possível salvar, tente novamente");
    }
  }

  function adicionarEndereco() {
    if (!novoEndereco.cep || !novoEndereco.rua || !novoEndereco.numero || !novoEndereco.cidade || !novoEndereco.uf) {
      toast.error("Preencha CEP, rua, número, cidade e UF");
      return;
    }
    setEnderecos((eds) => [{ ...novoEndereco, id: crypto.randomUUID() }, ...eds]);
    setNovoEndereco({ id: "tmp", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "" });
    toast.success("configuração salva");
  }

  function removerEndereco(id: string) {
    setEnderecos((eds) => eds.filter((e) => e.id !== id));
    toast.success("configuração salva");
  }

  function salvarUsuarios() {
    if (!canManage) {
      toast.error("você não tem permissão para acessar esta funcionalidade");
      return;
    }
    toast.success("configuração salva");
  }

  function convidarUsuario() {
    if (!canManage) {
      toast.error("você não tem permissão para acessar esta funcionalidade");
      return;
    }
    setUsuarios((us) => [
      ...us,
      { id: crypto.randomUUID(), nome: conviteEmail.split("@")[0] || "Convidado", email: conviteEmail, papel: "FUNCIONARIO", ...convitePerm },
    ]);
    setConviteEmail("");
    setConvitePerm({ criarEnvios: true, verFinanceiro: false, gerarRecargaPix: false, acessarSuporte: true });
    setAbrirConvite(false);
    toast.success("configuração salva");
  }

  function salvarWebhooks() {
    if (!canManage) {
      toast.error("você não tem permissão para acessar esta funcionalidade");
      return;
    }
    toast.success("configuração salva");
  }

  function salvarPreco() {
    if (!canManage) {
      toast.error("você não tem permissão para acessar esta funcionalidade");
      return;
    }
    toast.success("configuração salva");
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span>⚙️</span>
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="perfil">Perfil do usuário</TabsTrigger>
          <TabsTrigger value="enderecos">Endereços de remetente</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários e permissões</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="precos">Regras de preço</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Nome</label>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} disabled={false === !isFuncionario ? false : false /* explicit */} />
              </div>
              <div>
                <label className="text-sm">E-mail</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled={false === !isFuncionario ? false : false} />
              </div>
              <div>
                <label className="text-sm">Senha</label>
                <Input type="password" placeholder="Nova senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
            </div>
            <Button onClick={salvarPerfil}>Salvar alterações</Button>
          </div>
        </TabsContent>

        <TabsContent value="enderecos" className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
            {!temEnderecos ? (
              <p className="text-sm text-muted-foreground">nenhuma configuração cadastrada ainda</p>
            ) : (
              <ul className="space-y-2">
                {enderecos.map((e) => (
                  <li key={e.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-md p-2">
                    <div className="text-sm">
                      <span className="font-medium">{e.rua}, {e.numero}</span>{e.complemento ? `, ${e.complemento}` : ""} — {e.bairro} — {e.cidade}/{e.uf} • CEP {e.cep}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" disabled>Editar</Button>
                      <Button variant="destructive" size="sm" disabled={isFuncionario} onClick={() => removerEndereco(e.id)} title={isFuncionario ? "Permissão necessária" : ""}>Remover</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm">CEP</label>
                <Input value={novoEndereco.cep} onChange={(e) => setNovoEndereco({ ...novoEndereco, cep: somenteNumeros(e.target.value) })} onBlur={(e) => buscarCep(e.target.value)} placeholder="00000000" inputMode="numeric" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm">Rua</label>
                <Input value={novoEndereco.rua} onChange={(e) => setNovoEndereco({ ...novoEndereco, rua: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Número</label>
                <Input value={novoEndereco.numero} onChange={(e) => setNovoEndereco({ ...novoEndereco, numero: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Complemento</label>
                <Input value={novoEndereco.complemento} onChange={(e) => setNovoEndereco({ ...novoEndereco, complemento: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Bairro</label>
                <Input value={novoEndereco.bairro} onChange={(e) => setNovoEndereco({ ...novoEndereco, bairro: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Cidade</label>
                <Input value={novoEndereco.cidade} onChange={(e) => setNovoEndereco({ ...novoEndereco, cidade: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">UF</label>
                <Input value={novoEndereco.uf} onChange={(e) => setNovoEndereco({ ...novoEndereco, uf: e.target.value.toUpperCase().slice(0, 2) })} placeholder="SP" />
              </div>
            </div>
            <Button onClick={adicionarEndereco} disabled={isFuncionario} title={isFuncionario ? "Permissão necessária" : ""}>Adicionar</Button>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
            {!usuarios.length ? (
              <p className="text-sm text-muted-foreground">nenhuma configuração cadastrada ainda</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Papel</TableHead>
                      <TableHead>Permissões</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.nome}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.papel}</TableCell>
                        <TableCell>
                          <div className="grid grid-cols-2 gap-2">
                            <label className="flex items-center gap-2 text-sm"><Checkbox checked={u.criarEnvios} disabled={!canManage} onCheckedChange={(v) => setUsuarios((arr) => arr.map((x) => x.id === u.id ? { ...x, criarEnvios: Boolean(v) } : x))} /> criar envios</label>
                            <label className="flex items-center gap-2 text-sm"><Checkbox checked={u.verFinanceiro} disabled={!canManage} onCheckedChange={(v) => setUsuarios((arr) => arr.map((x) => x.id === u.id ? { ...x, verFinanceiro: Boolean(v) } : x))} /> ver financeiro</label>
                            <label className="flex items-center gap-2 text-sm"><Checkbox checked={u.gerarRecargaPix} disabled={!canManage} onCheckedChange={(v) => setUsuarios((arr) => arr.map((x) => x.id === u.id ? { ...x, gerarRecargaPix: Boolean(v) } : x))} /> gerar recarga pix</label>
                            <label className="flex items-center gap-2 text-sm"><Checkbox checked={u.acessarSuporte} disabled={!canManage} onCheckedChange={(v) => setUsuarios((arr) => arr.map((x) => x.id === u.id ? { ...x, acessarSuporte: Boolean(v) } : x))} /> acessar suporte</label>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button onClick={salvarUsuarios} disabled={!canManage} title={!canManage ? "Permissão necessária" : ""}>Salvar alterações</Button>
              {canManage && (
                <Dialog open={abrirConvite} onOpenChange={setAbrirConvite}>
                  <DialogTrigger asChild>
                    <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Convidar usuário</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Convidar usuário</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">E-mail</label>
                        <Input value={conviteEmail} onChange={(e) => setConviteEmail(e.target.value)} placeholder="email@exemplo.com" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-2 text-sm"><Checkbox checked={convitePerm.criarEnvios} onCheckedChange={(v) => setConvitePerm((p) => ({ ...p, criarEnvios: Boolean(v) }))} /> criar envios</label>
                        <label className="flex items-center gap-2 text-sm"><Checkbox checked={convitePerm.verFinanceiro} onCheckedChange={(v) => setConvitePerm((p) => ({ ...p, verFinanceiro: Boolean(v) }))} /> ver financeiro</label>
                        <label className="flex items-center gap-2 text-sm"><Checkbox checked={convitePerm.gerarRecargaPix} onCheckedChange={(v) => setConvitePerm((p) => ({ ...p, gerarRecargaPix: Boolean(v) }))} /> gerar recarga pix</label>
                        <label className="flex items-center gap-2 text-sm"><Checkbox checked={convitePerm.acessarSuporte} onCheckedChange={(v) => setConvitePerm((p) => ({ ...p, acessarSuporte: Boolean(v) }))} /> acessar suporte</label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={convidarUsuario}>Enviar convite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
            <div>
              <label className="text-sm">URL</label>
              <Input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} disabled={!canManage} placeholder="https://minhaurl.com/webhook" />
            </div>
            <div>
              <label className="text-sm">Secret</label>
              <Input value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} disabled={!canManage} placeholder="********" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(eventos).map((ev) => (
                <label key={ev} className="flex items-center gap-2 text-sm">
                  <Checkbox checked={(eventos as any)[ev]} disabled={!canManage} onCheckedChange={(v) => setEventos((prev) => ({ ...prev, [ev]: Boolean(v) }))} /> {ev}
                </label>
              ))}
            </div>
            <Button onClick={salvarWebhooks} disabled={!canManage} title={!canManage ? "Permissão necessária" : ""}>Salvar</Button>
          </div>
        </TabsContent>

        <TabsContent value="precos" className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm flex items-center gap-2">
                <input type="radio" name="modo_preco" className="h-4 w-4" checked={modoPreco === "markup_fixo"} onChange={() => setModoPreco("markup_fixo")} disabled={!canManage} />
                Markup fixo (%)
              </label>
              <label className="text-sm flex items-center gap-2">
                <input type="radio" name="modo_preco" className="h-4 w-4" checked={modoPreco === "faixas"} onChange={() => setModoPreco("faixas")} disabled={!canManage} />
                Faixas configuráveis
              </label>
            </div>

            {modoPreco === "markup_fixo" ? (
              <div className="max-w-xs">
                <label className="text-sm">Percentual</label>
                <Input type="number" value={markup} onChange={(e) => setMarkup(parseFloat(e.target.value || "0"))} disabled={!canManage} />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">exemplo: até R$20 → +20%; R$20–40 → +15%; acima de R$40 → +10%</div>
                {faixas.map((f, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <Input placeholder="de" value={(f as any).de ?? ""} onChange={(e) => setFaixas((arr) => arr.map((x, i) => i === idx ? { ...(x as any), de: e.target.value } : x))} disabled={!canManage} />
                    <Input placeholder="até" value={(f as any).ate ?? ""} onChange={(e) => setFaixas((arr) => arr.map((x, i) => i === idx ? { ...(x as any), ate: e.target.value } : x))} disabled={!canManage} />
                    <Input placeholder="acima" value={(f as any).acima ?? ""} onChange={(e) => setFaixas((arr) => arr.map((x, i) => i === idx ? { ...(x as any), acima: e.target.value } : x))} disabled={!canManage} />
                    <Input placeholder="%" value={(f as any).perc ?? ""} onChange={(e) => setFaixas((arr) => arr.map((x, i) => i === idx ? { ...(x as any), perc: e.target.value } : x))} disabled={!canManage} />
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button variant="secondary" disabled={!canManage} onClick={() => setFaixas((arr) => [...arr, { perc: 0 } as any])}>Adicionar faixa</Button>
                </div>
              </div>
            )}

            <Button onClick={salvarPreco} disabled={!canManage} title={!canManage ? "Permissão necessária" : ""}>Salvar</Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
