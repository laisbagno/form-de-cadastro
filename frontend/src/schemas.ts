import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  email: z.string().email("Digite um e-mail válido"),
  corPreferida: z
    .union([z.string(), z.null()])
    .refine(
      (val) =>
        val !== null &&
        ["vermelho", "laranja", "amarelo", "verde", "azul", "violeta"].includes(
          val
        ),
      { message: "Selecione uma cor" }
    ),
  observacoes: z.string().optional(),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
