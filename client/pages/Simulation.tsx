import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSimulation } from "@/context/SimulationContext";
import { SimulacaoInput } from "@shared/api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  origemCep: z
    .string()
    .min(8, "CEP obrigatório")
    .max(8, "CEP deve ter 8 dígitos"),
  origemCidade: z.string().optional(),
  origemEstado: z.string().optional(),
  destinoCep: z
    .string()
    .min(8, "CEP obrigatório")
    .max(8, "CEP deve ter 8 dígitos"),
  destinoCidade: z.string().optional(),
  destinoEstado: z.string().optional(),
  destinoRua: z.string().optional(),
  destinoBairro: z.string().optional(),
  pesoKg: z.coerce.number().positive("Peso deve ser maior que 0"),
  comprimento: z.coerce.number().positive("Comprimento deve ser maior que 0"),
  largura: z.coerce.number().positive("Largura deve ser maior que 0"),
  altura: z.coerce.number().positive("Altura deve ser maior que 0"),
  valorDeclarado: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function SimulationPage() {
  const navigate = useNavigate();
  const { calcular, carregando } = useSimulation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    const input: SimulacaoInput = {
      origem: {
        cep: values.origemCep,
        cidade: values.origemCidade,
        estado: values.origemEstado,
      },
      destino: {
        cep: values.destinoCep,
        cidade: values.destinoCidade,
        estado: values.destinoEstado,
        rua: values.destinoRua,
        bairro: values.destinoBairro,
      },
      pesoKg: values.pesoKg,
      dimensoes: {
        comprimentoCm: values.comprimento,
        larguraCm: values.largura,
        alturaCm: values.altura,
      },
      valorDeclarado: values.valorDeclarado,
    };
    await calcular(input);
    navigate("/simulacao/resultados");
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <span>📦</span>
        <h1 className="text-2xl font-bold">Simulação de frete</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border bg-white p-4 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-sm">Origem - CEP</label>
            <Input
              placeholder="00000000"
              inputMode="numeric"
              maxLength={8}
              {...register("origemCep")}
            />
            {errors.origemCep && (
              <p className="text-xs text-red-600">{errors.origemCep.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Origem - Cidade</label>
            <Input placeholder="Cidade" {...register("origemCidade")} />
          </div>
          <div>
            <label className="text-sm">Origem - Estado</label>
            <Input
              placeholder="UF"
              maxLength={2}
              {...register("origemEstado")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="text-sm">Destino - CEP</label>
            <Input
              placeholder="00000000"
              inputMode="numeric"
              maxLength={8}
              {...register("destinoCep")}
            />
            {errors.destinoCep && (
              <p className="text-xs text-red-600">
                {errors.destinoCep.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm">Destino - Cidade</label>
            <Input placeholder="Cidade" {...register("destinoCidade")} />
          </div>
          <div>
            <label className="text-sm">Destino - Estado</label>
            <Input
              placeholder="UF"
              maxLength={2}
              {...register("destinoEstado")}
            />
          </div>
          <div>
            <label className="text-sm">Destino - Rua</label>
            <Input placeholder="Rua" {...register("destinoRua")} />
          </div>
          <div>
            <label className="text-sm">Destino - Bairro</label>
            <Input placeholder="Bairro" {...register("destinoBairro")} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="text-sm">Peso (kg)</label>
            <Input type="number" step="0.01" min="0" {...register("pesoKg")} />
            {errors.pesoKg && (
              <p className="text-xs text-red-600">{errors.pesoKg.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Comprimento (cm)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              {...register("comprimento")}
            />
            {errors.comprimento && (
              <p className="text-xs text-red-600">
                {errors.comprimento.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm">Largura (cm)</label>
            <Input type="number" step="0.1" min="0" {...register("largura")} />
            {errors.largura && (
              <p className="text-xs text-red-600">{errors.largura.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Altura (cm)</label>
            <Input type="number" step="0.1" min="0" {...register("altura")} />
            {errors.altura && (
              <p className="text-xs text-red-600">{errors.altura.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Valor declarado (R$)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...register("valorDeclarado")}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={carregando}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            Simular frete
          </Button>
        </div>
      </form>
    </section>
  );
}
