import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const { papel, token, lojas: lojasCtx, lojaAtualId, setLojaAtualId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (papel === "FUNCIONARIO") {
      toast.error("Você não tem permissão para acessar esta página.");
      navigate("/dashboard", { replace: true });
    }
  }, [papel]);

  const isAdmin = papel === "ADMIN";
  const isDono = papel === "DONO";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Lojas e Usuários</h1>
        <p className="text-sm text-muted-foreground">Crie, edite e gerencie lojas, donos e funcionários.</p>
      </div>

      {isDono ? (
        <OwnerSection lojasCtx={lojasCtx} lojaAtualId={lojaAtualId} setLojaAtualId={setLojaAtualId} />
      ) : null}

      {isAdmin ? <AdminSection lojasCtx={lojasCtx} /> : null}
    </div>
  );
}

// Types
type Owner = { id: string; nome: string; email: string; createdAt: string; ativo: boolean; lojaIds: string[] };
type LojaAdmin = { id: string; nome: string; donoId?: string; createdAt: string; ativo: boolean };
type Perms = { criarEnvios: boolean; verFinanceiro: boolean; gerarPix: boolean; atenderSuporte: boolean };
type Funcionario = { id: string; nome: string; email: string; ativo: boolean; permissoes: Perms };

function AdminSection({ lojasCtx }: { lojasCtx: { id: string; nome: string }[] }) {
  const [loading, setLoading] = useState(true);
  const [lojas, setLojas] = useState<LojaAdmin[]>([]);
  const [donos, setDonos] = useState<Owner[]>([]);

  useEffect(() => {
    const init = async () => {
      await new Promise((r) => setTimeout(r, 500));
      const seedDonos: Owner[] = [
        { id: "d1", nome: "Ana Lima", email: "ana@ex.com", createdAt: "2024-05-01", ativo: true, lojaIds: ["loja1"] },
        { id: "d2", nome: "Carlos Souza", email: "carlos@ex.com", createdAt: "2024-06-10", ativo: true, lojaIds: ["loja2", "loja3"] },
      ];
      const seedLojas: LojaAdmin[] = (lojasCtx.length ? lojasCtx : [
        { id: "loja1", nome: "Loja Centro" },
        { id: "loja2", nome: "Loja Sul" },
        { id: "loja3", nome: "Loja Norte" },
      ]).map((l, idx) => ({ id: l.id, nome: l.nome, donoId: idx === 0 ? "d1" : "d2", createdAt: "2024-06-01", ativo: true }));
      setDonos(seedDonos);
      setLojas(seedLojas);
      setLoading(false);
    };
    init();
  }, [lojasCtx]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader className="flex items-center justify-between sm:flex-row sm:items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2"><span role="img" aria-label="lojas">🏬</span> Lojas</CardTitle>
            <CardDescription>Gerencie todas as lojas.</CardDescription>
          </div>
          <CreateLojaDialog donos={donos} onCreate={(nova) => {
            setLojas((prev) => [...prev, { ...nova, id: `loja_${Date.now()}`, createdAt: new Date().toISOString().slice(0,10), ativo: true }]);
            toast.success("Loja criada com sucesso");
          }} />
        </CardHeader>
        <CardContent>
          {loading ? <SkeletonTable /> : (
            lojas.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma loja cadastrada ainda.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Loja</TableHead>
                    <TableHead>Dono</TableHead>
                    <TableHead>Criada em</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lojas.map((l) => {
                    const dono = donos.find((d) => d.id === l.donoId);
                    return (
                      <TableRow key={l.id} className="odd:bg-gray-50">
                        <TableCell className="font-medium">{l.nome}</TableCell>
                        <TableCell>{dono ? dono.nome : "—"}</TableCell>
                        <TableCell>{l.createdAt}</TableCell>
                        <TableCell>
                          {l.ativo ? <Badge>Ativa</Badge> : <Badge variant="secondary">Inativa</Badge>}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="secondary" size="sm" aria-label={`Editar ${l.nome}`} onClick={() => toast.info("Editar loja em breve")}>Editar</Button>
                          <Button variant={l.ativo ? "destructive" : "default"} size="sm" aria-label={`${l.ativo ? "Desativar" : "Ativar"} ${l.nome}`} onClick={() => {
                            setLojas((prev)=> prev.map((x)=> x.id===l.id ? { ...x, ativo: !x.ativo } : x));
                            toast.success(l.ativo ? "Loja desativada" : "Loja ativada");
                          }}>{l.ativo ? "Desativar" : "Ativar"}</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between sm:flex-row sm:items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2"><span role="img" aria-label="donos">👤</span> Donos</CardTitle>
            <CardDescription>Gerencie os donos de loja.</CardDescription>
          </div>
          <CreateDonoDialog lojas={lojas} onCreate={(novo) => {
            setDonos((prev) => [...prev, { ...novo, id: `d_${Date.now()}`, createdAt: new Date().toISOString().slice(0,10), ativo: true }]);
            if (novo.lojaIds?.length) {
              setLojas((prev)=> prev.map((lj)=> novo.lojaIds.includes(lj.id) ? { ...lj, donoId: `d_${Date.now()}` } : lj));
            }
            toast.success("Dono criado com sucesso");
          }} />
        </CardHeader>
        <CardContent>
          {loading ? <SkeletonTable /> : (
            donos.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum dono cadastrado ainda.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Lojas associadas</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donos.map((d) => (
                    <TableRow key={d.id} className="odd:bg-gray-50">
                      <TableCell className="font-medium">{d.nome}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell>{d.lojaIds.length}</TableCell>
                      <TableCell>{d.createdAt}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="secondary" size="sm" aria-label={`Editar ${d.nome}`} onClick={() => toast.info("Editar dono em breve")}>Editar</Button>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Reset de senha enviado")}>Resetar senha</Button>
                        <Button variant={d.ativo ? "destructive" : "default"} size="sm" onClick={() => {
                          setDonos((prev)=> prev.map((x)=> x.id===d.id ? { ...x, ativo: !x.ativo } : x));
                          toast.success(d.ativo ? "Dono desativado" : "Dono ativado");
                        }}>{d.ativo ? "Desativar" : "Ativar"}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function OwnerSection({ lojasCtx, lojaAtualId, setLojaAtualId }: { lojasCtx: { id: string; nome: string }[]; lojaAtualId: string | null; setLojaAtualId: (id: string)=>void }) {
  const [loading, setLoading] = useState(true);
  const [funcsByLoja, setFuncsByLoja] = useState<Record<string, Funcionario[]>>({});

  useEffect(() => {
    const init = async () => {
      await new Promise((r) => setTimeout(r, 500));
      const seed: Record<string, Funcionario[]> = {};
      lojasCtx.forEach((l, idx) => {
        seed[l.id] = [
          { id: `${l.id}_f1`, nome: `Maria ${idx+1}`, email: `maria${idx+1}@ex.com`, ativo: true, permissoes: { criarEnvios: true, verFinanceiro: false, gerarPix: true, atenderSuporte: true } },
          { id: `${l.id}_f2`, nome: `Pedro ${idx+1}`, email: `pedro${idx+1}@ex.com`, ativo: true, permissoes: { criarEnvios: true, verFinanceiro: true, gerarPix: false, atenderSuporte: false } },
        ];
      });
      setFuncsByLoja(seed);
      setLoading(false);
    };
    init();
  }, [lojasCtx]);

  const currentLojaId = lojaAtualId ?? lojasCtx[0]?.id ?? null;
  const currentLoja = useMemo(() => lojasCtx.find((l)=> l.id===currentLojaId) || null, [currentLojaId, lojasCtx]);
  const funcionarios = currentLojaId ? (funcsByLoja[currentLojaId] || []) : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2"><span role="img" aria-label="funcionarios">👥</span> Funcionários da Loja Atual</h2>
          <p className="text-sm text-muted-foreground">Gerencie acessos e permissões dos funcionários.</p>
        </div>
        <div className="w-full sm:w-64">
          <Label htmlFor="selLoja">Selecione a Loja</Label>
          <select id="selLoja" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={currentLojaId ?? ""} onChange={(e)=> setLojaAtualId(e.target.value)}>
            {lojasCtx.map((l)=> (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between sm:flex-row sm:items-center">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">Funcionários</CardTitle>
            <CardDescription>Lista de colaboradores da loja {currentLoja?.nome}.</CardDescription>
          </div>
          {currentLojaId ? (
            <InviteFuncionarioDialog lojaId={currentLojaId} onInvite={(novo) => {
              setFuncsByLoja((prev)=> ({ ...prev, [currentLojaId]: [...(prev[currentLojaId] || []), novo] }));
              toast.success("Funcionário convidado");
            }} />
          ) : null}
        </CardHeader>
        <CardContent>
          {loading ? <SkeletonTable /> : (
            funcionarios.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum funcionário na loja.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Permissões</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funcionarios.map((f) => (
                    <TableRow key={f.id} className="odd:bg-gray-50">
                      <TableCell className="font-medium">{f.nome}</TableCell>
                      <TableCell>{f.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {f.permissoes.criarEnvios && <Badge className="flex gap-1"><ShieldCheck className="h-3 w-3" />Criar envios</Badge>}
                          {f.permissoes.verFinanceiro && <Badge variant="secondary">Relatórios</Badge>}
                          {f.permissoes.gerarPix && <Badge variant="secondary">PIX</Badge>}
                          {f.permissoes.atenderSuporte && <Badge variant="secondary">Suporte</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{f.ativo ? <Badge>Ativo</Badge> : <Badge variant="secondary">Inativo</Badge>}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <EditPermsDialog funcionario={f} onSave={(perms)=> {
                          setFuncsByLoja((prev)=> ({ ...prev, [currentLojaId]: prev[currentLojaId].map((x)=> x.id===f.id ? { ...x, permissoes: perms } : x) }));
                          toast.success("Permissões atualizadas");
                        }} />
                        <Button variant="outline" size="sm" onClick={()=> toast.success("Reset de senha enviado")}>Resetar senha</Button>
                        <Button variant={f.ativo ? "destructive" : "default"} size="sm" onClick={() => {
                          setFuncsByLoja((prev)=> ({ ...prev, [currentLojaId]: prev[currentLojaId].map((x)=> x.id===f.id ? { ...x, ativo: !x.ativo } : x) }));
                          toast.success(f.ativo ? "Funcionário desativado" : "Funcionário ativado");
                        }}>{f.ativo ? "Remover" : "Reativar"}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 w-full rounded-md bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

function CreateLojaDialog({ donos, onCreate }: { donos: Owner[]; onCreate: (data: { nome: string; donoId?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [doc, setDoc] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modo, setModo] = useState<"selecionar" | "novo">("selecionar");
  const [donoSel, setDonoSel] = useState<string>(donos[0]?.id ?? "");
  const [novoDono, setNovoDono] = useState<{ nome: string; email: string; senha: string }>({ nome: "", email: "", senha: "" });

  const handleSubmit = () => {
    if (!nome) return toast.error("Informe o nome da loja");
    if (modo === "selecionar" && !donoSel) return toast.error("Selecione um dono");
    if (modo === "novo" && (!novoDono.nome || !novoDono.email || !novoDono.senha)) return toast.error("Preencha os dados do novo dono");
    onCreate({ nome, donoId: modo === "selecionar" ? donoSel : undefined });
    setOpen(false);
    setNome(""); setDoc(""); setEndereco(""); setNovoDono({ nome: "", email: "", senha: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Criar Nova Loja">Criar Nova Loja</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Loja</DialogTitle>
          <DialogDescription>Preencha os dados da loja e do dono.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="nomeLoja">Nome da Loja</Label>
            <Input id="nomeLoja" value={nome} onChange={(e)=> setNome(e.target.value)} placeholder="Ex: Loja Centro" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="doc">CNPJ/CPF</Label>
              <Input id="doc" value={doc} onChange={(e)=> setDoc(e.target.value)} placeholder="00.000.000/0000-00" />
            </div>
            <div>
              <Label htmlFor="end">Endereço</Label>
              <Input id="end" value={endereco} onChange={(e)=> setEndereco(e.target.value)} placeholder="Rua, número, bairro" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Vincular Dono</Label>
            <div className="flex gap-3">
              <Button type="button" variant={modo === "selecionar" ? "default" : "outline"} onClick={()=> setModo("selecionar")}>Selecionar existente</Button>
              <Button type="button" variant={modo === "novo" ? "default" : "outline"} onClick={()=> setModo("novo")}>Criar novo</Button>
            </div>
            {modo === "selecionar" ? (
              <div>
                <Label className="sr-only" htmlFor="donoSel">Dono</Label>
                <Select value={donoSel} onValueChange={setDonoSel}>
                  <SelectTrigger id="donoSel"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {donos.map((d)=> (
                      <SelectItem key={d.id} value={d.id}>{d.nome} ({d.email})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="novoNome">Nome</Label>
                  <Input id="novoNome" value={novoDono.nome} onChange={(e)=> setNovoDono((p)=> ({ ...p, nome: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="novoEmail">E-mail</Label>
                  <Input id="novoEmail" type="email" value={novoDono.email} onChange={(e)=> setNovoDono((p)=> ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="novoSenha">Senha</Label>
                  <Input id="novoSenha" type="password" value={novoDono.senha} onChange={(e)=> setNovoDono((p)=> ({ ...p, senha: e.target.value }))} />
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateDonoDialog({ lojas, onCreate }: { lojas: LojaAdmin[]; onCreate: (d: { nome: string; email: string; senha: string; lojaIds: string[] }) => void }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lojaIds, setLojaIds] = useState<string[]>([]);

  const toggleLoja = (id: string) => setLojaIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleSubmit = () => {
    if (!nome || !email || !senha) return toast.error("Preencha todos os campos");
    onCreate({ nome, email, senha, lojaIds });
    setOpen(false);
    setNome(""); setEmail(""); setSenha(""); setLojaIds([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Criar Novo Dono">Criar Novo Dono</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Dono</DialogTitle>
          <DialogDescription>Informe os dados do novo dono e associe às lojas.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="dnome">Nome</Label>
            <Input id="dnome" value={nome} onChange={(e)=> setNome(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="demail">E-mail</Label>
            <Input id="demail" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dsenha">Senha</Label>
            <Input id="dsenha" type="password" value={senha} onChange={(e)=> setSenha(e.target.value)} />
          </div>
          <div>
            <Label>Lojas associadas</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lojas.map((l)=> (
                <label key={l.id} className="flex items-center gap-2 rounded-md border p-2">
                  <input type="checkbox" checked={lojaIds.includes(l.id)} onChange={()=> toggleLoja(l.id)} aria-label={`Associar ${l.nome}`} />
                  <span>{l.nome}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InviteFuncionarioDialog({ lojaId, onInvite }: { lojaId: string; onInvite: (f: Funcionario) => void }) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perms, setPerms] = useState<Perms>({ criarEnvios: true, verFinanceiro: false, gerarPix: false, atenderSuporte: false });

  const handleSubmit = () => {
    if (!nome || !email || !senha) return toast.error("Preencha todos os campos");
    const novo: Funcionario = { id: `${lojaId}_${Date.now()}`, nome, email, ativo: true, permissoes: perms };
    onInvite(novo);
    setOpen(false);
    setNome(""); setEmail(""); setSenha(""); setPerms({ criarEnvios: true, verFinanceiro: false, gerarPix: false, atenderSuporte: false });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Convidar Funcionário">Convidar Funcionário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar Funcionário</DialogTitle>
          <DialogDescription>Preencha os dados do funcionário. Loja associada: {lojaId}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="fnome">Nome</Label>
            <Input id="fnome" value={nome} onChange={(e)=> setNome(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="femail">E-mail</Label>
            <Input id="femail" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="fsenha">Senha</Label>
            <Input id="fsenha" type="password" value={senha} onChange={(e)=> setSenha(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Permissões</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <PermCheckbox label="Criar envios" checked={perms.criarEnvios} onChange={(v)=> setPerms((p)=> ({ ...p, criarEnvios: v }))} />
              <PermCheckbox label="Visualizar relatórios financeiros" checked={perms.verFinanceiro} onChange={(v)=> setPerms((p)=> ({ ...p, verFinanceiro: v }))} />
              <PermCheckbox label="Gerar recargas PIX" checked={perms.gerarPix} onChange={(v)=> setPerms((p)=> ({ ...p, gerarPix: v }))} />
              <PermCheckbox label="Atender suporte" checked={perms.atenderSuporte} onChange={(v)=> setPerms((p)=> ({ ...p, atenderSuporte: v }))} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Convidar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditPermsDialog({ funcionario, onSave }: { funcionario: Funcionario; onSave: (p: Perms)=> void }) {
  const [open, setOpen] = useState(false);
  const [perms, setPerms] = useState<Perms>(funcionario.permissoes);
  useEffect(()=> { setPerms(funcionario.permissoes); }, [funcionario]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">Editar permissões</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Permissões</DialogTitle>
          <DialogDescription>Atualize as permissões de {funcionario.nome}.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <PermCheckbox label="Criar envios" checked={perms.criarEnvios} onChange={(v)=> setPerms((p)=> ({ ...p, criarEnvios: v }))} />
          <PermCheckbox label="Visualizar relatórios financeiros" checked={perms.verFinanceiro} onChange={(v)=> setPerms((p)=> ({ ...p, verFinanceiro: v }))} />
          <PermCheckbox label="Gerar recargas PIX" checked={perms.gerarPix} onChange={(v)=> setPerms((p)=> ({ ...p, gerarPix: v }))} />
          <PermCheckbox label="Atender suporte" checked={perms.atenderSuporte} onChange={(v)=> setPerms((p)=> ({ ...p, atenderSuporte: v }))} />
        </div>
        <DialogFooter>
          <Button onClick={()=> { onSave(perms); setOpen(false); }}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PermCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean)=> void }) {
  return (
    <label className="flex items-center gap-2 rounded-md border p-2">
      <Checkbox checked={checked} onCheckedChange={(v)=> onChange(Boolean(v))} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
