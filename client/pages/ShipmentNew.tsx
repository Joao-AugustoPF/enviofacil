import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";

export default function ShipmentNewPage() {
  const navigate = useNavigate();
  const { lojaAtualId } = useAuth();
  const { recipients } = useDashboard();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [remetente, setRemetente] = useState<{
    id?: string;
    nome: string;
    endereco?: string;
  }>({ nome: "" });
  const [destinatario, setDestinatario] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    nome: "",
    telefone: "",
    email: "",
  });
  const [pacote, setPacote] = useState({
    pesoKg: "",
    c: "",
    l: "",
    a: "",
    valorDeclarado: "",
    ar: false,
    maoPropria: false,
  });
  const [servico, setServico] = useState<{
    transportadora?: string;
    nome?: string;
    preco?: number;
    prazo?: string;
  }>({});
  const [referencia, setReferencia] = useState("");
  const [qRec, setQRec] = useState("");
  const [showList, setShowList] = useState(false);

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(remetente.nome);
    if (step === 2)
      return (
        destinatario.cep.length === 8 &&
        destinatario.rua &&
        destinatario.cidade &&
        destinatario.uf.length === 2 &&
        destinatario.nome &&
        destinatario.telefone
      );
    if (step === 3) {
      const peso = Number(pacote.pesoKg);
      const c = Number(pacote.c);
      const l = Number(pacote.l);
      const a = Number(pacote.a);
      if ([peso, c, l, a].some((x) => !x || x <= 0)) return false;
      if (Math.max(c, l, a) > 300) return false;
      const vd = Number(pacote.valorDeclarado || 0);
      return vd >= 0;
    }
    if (step === 4) return Boolean(servico.nome);
    if (step === 5) return true;
    return false;
  }, [step, remetente, destinatario, pacote, servico]);

  function applyRecipient(r: any) {
    setDestinatario({
      cep: r.cep || "",
      rua: r.rua || "",
      numero: r.numero || "",
      complemento: r.complemento || "",
      bairro: r.bairro || "",
      cidade: r.cidade || "",
      uf: r.uf || "",
      nome: r.nome || "",
      telefone: r.telefone || "",
      email: r.email || "",
    });
  }

  function handleNext() {
    if (!canNext) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  }
  function handlePrev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleConfirm() {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const newId = `#ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      toast.success("Etiqueta gerada com sucesso");
      navigate(`/shipments/${encodeURIComponent(newId)}`);
    } catch {
      toast.error("A etiqueta não pôde ser gerada. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const recipientsFiltered = useMemo(() => {
    const q = qRec.toLowerCase();
    if (!q) return recipients.slice(0, 6);
    return recipients
      .filter((r) =>
        [r.nome, r.cpfCnpj, r.telefone, r.email, r.cidade, r.uf, r.cep].some(
          (v) => (v || "").toLowerCase().includes(q),
        ),
      )
      .slice(0, 10);
  }, [recipients, qRec]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Criar Envio</h1>
        <p className="text-sm text-muted-foreground">
          Wizard em 5 etapas para gerar etiqueta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Etapa {step} de 5</CardTitle>
          <CardDescription>
            Loja selecionada: {lojaAtualId ?? "—"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div
              className="space-y-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNext();
              }}
            >
              <h3 className="font-medium">Remetente</h3>
              <div>
                <Label htmlFor="remNome">Nome/Identificação</Label>
                <Input
                  id="remNome"
                  placeholder="Ex: Loja Centro"
                  value={remetente.nome}
                  onChange={(e) =>
                    setRemetente({ ...remetente, nome: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="remEnd">Endereço</Label>
                <Input
                  id="remEnd"
                  placeholder="Rua, número, bairro"
                  value={remetente.endereco || ""}
                  onChange={(e) =>
                    setRemetente({ ...remetente, endereco: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              className="grid gap-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNext();
              }}
            >
              <h3 className="font-medium">Destinatário</h3>

              {/* Autocomplete de destinatários salvos */}
              <div>
                <Label htmlFor="selDest">Selecionar destinatário salvo</Label>
                <div className="relative">
                  <Input
                    id="selDest"
                    placeholder="Busque por nome, cidade, CPF/CNPJ"
                    value={qRec}
                    onChange={(e) => {
                      setQRec(e.target.value);
                      setShowList(true);
                    }}
                    onFocus={() => setShowList(true)}
                  />
                  {showList && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow">
                      {recipientsFiltered.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">
                          Nenhum resultado
                        </div>
                      ) : (
                        recipientsFiltered.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              applyRecipient(r);
                              setQRec(r.nome);
                              setShowList(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-accent"
                          >
                            <div className="text-sm font-medium">{r.nome}</div>
                            <div className="text-xs text-muted-foreground">
                              {r.cidade}/{r.uf} • {r.cpfCnpj}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="Somente números"
                    value={destinatario.cep}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        cep: e.target.value.replace(/\D/g, "").slice(0, 8),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={destinatario.cidade}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        cidade: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="uf">UF</Label>
                  <Input
                    id="uf"
                    maxLength={2}
                    value={destinatario.uf}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        uf: e.target.value.toUpperCase().slice(0, 2),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    value={destinatario.rua}
                    onChange={(e) =>
                      setDestinatario({ ...destinatario, rua: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={destinatario.numero}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        numero: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="compl">Complemento</Label>
                  <Input
                    id="compl"
                    value={destinatario.complemento}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        complemento: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={destinatario.bairro}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        bairro: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tel">Telefone</Label>
                  <Input
                    id="tel"
                    value={destinatario.telefone}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        telefone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={destinatario.email}
                    onChange={(e) =>
                      setDestinatario({
                        ...destinatario,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              className="grid gap-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNext();
              }}
            >
              <h3 className="font-medium">Pacote</h3>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    inputMode="decimal"
                    value={pacote.pesoKg}
                    onChange={(e) =>
                      setPacote({ ...pacote, pesoKg: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="c">Comprimento (cm)</Label>
                  <Input
                    id="c"
                    inputMode="decimal"
                    value={pacote.c}
                    onChange={(e) =>
                      setPacote({ ...pacote, c: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="l">Largura (cm)</Label>
                  <Input
                    id="l"
                    inputMode="decimal"
                    value={pacote.l}
                    onChange={(e) =>
                      setPacote({ ...pacote, l: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="a">Altura (cm)</Label>
                  <Input
                    id="a"
                    inputMode="decimal"
                    value={pacote.a}
                    onChange={(e) =>
                      setPacote({ ...pacote, a: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="vd">Valor declarado (R$)</Label>
                  <Input
                    id="vd"
                    inputMode="decimal"
                    value={pacote.valorDeclarado}
                    onChange={(e) =>
                      setPacote({ ...pacote, valorDeclarado: e.target.value })
                    }
                    placeholder="Usado para seguro"
                  />
                </div>
                <div>
                  <Label>Serviços adicionais</Label>
                  <div className="flex gap-3 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pacote.ar}
                        onChange={(e) =>
                          setPacote({ ...pacote, ar: e.target.checked })
                        }
                      />{" "}
                      AR
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pacote.maoPropria}
                        onChange={(e) =>
                          setPacote({ ...pacote, maoPropria: e.target.checked })
                        }
                      />{" "}
                      Mão Própria
                    </label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ref">Referência externa</Label>
                  <Input
                    id="ref"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-3">
              <h3 className="font-medium">Cotação</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    transportadora: "Correios",
                    nome: "PAC",
                    preco: 24.9,
                    prazo: "5-8 dias",
                    economia: "-15% vs. balcão",
                  },
                  {
                    transportadora: "Correios",
                    nome: "SEDEX",
                    preco: 39.9,
                    prazo: "2-3 dias",
                    economia: "-20% vs. balcão",
                  },
                  {
                    transportadora: "Jadlog",
                    nome: "Expresso",
                    preco: 34.5,
                    prazo: "3-6 dias",
                    economia: "-12% vs. balcão",
                  },
                ].map((opt) => (
                  <button
                    key={opt.nome}
                    className={`rounded-md border p-3 text-left ${servico.nome === opt.nome ? "ring-2 ring-primary" : "hover:bg-accent"}`}
                    onClick={() => setServico(opt)}
                    aria-label={`Selecionar ${opt.transportadora} ${opt.nome}`}
                  >
                    <div className="font-medium">
                      {opt.transportadora} — {opt.nome}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {opt.prazo} • {opt.economia}
                    </div>
                    <div className="text-lg font-semibold mt-1">
                      R$ {opt.preco.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid gap-3">
              <h3 className="font-medium">Confirmação</h3>
              <div className="rounded-md border p-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Remetente:</span>{" "}
                  {remetente.nome}
                </div>
                <div>
                  <span className="text-muted-foreground">Destinatário:</span>{" "}
                  {destinatario.nome} • {destinatario.cidade}/{destinatario.uf}
                </div>
                <div>
                  <span className="text-muted-foreground">Pacote:</span>{" "}
                  {pacote.pesoKg} kg • {pacote.c}x{pacote.l}x{pacote.a} cm • VD
                  R$ {pacote.valorDeclarado || "0,00"}
                </div>
                <div>
                  <span className="text-muted-foreground">Serviço:</span>{" "}
                  {servico.transportadora} {servico.nome} • R${" "}
                  {servico.preco?.toFixed(2)}
                </div>
                <div>
                  <span className="text-muted-foreground">Referência:</span>{" "}
                  {referencia || "—"}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={step === 1}
            >
              Voltar
            </Button>
            {step < 5 ? (
              <Button onClick={handleNext} disabled={!canNext}>
                Avançar
              </Button>
            ) : (
              <Button onClick={handleConfirm} disabled={loading}>
                {loading ? "Gerando..." : "Gerar Etiqueta"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
