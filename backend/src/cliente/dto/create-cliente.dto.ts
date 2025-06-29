import { z } from 'zod';

// Schema de validação com mensagens personalizadas
export const createClienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos (somente números)'),
  email: z.string().email('E-mail inválido'),
  corPreferida: z.enum([
    'vermelho',
    'laranja',
    'amarelo',
    'verde',
    'azul',
    'anil',
    'violeta',
  ]),
  observacoes: z.string().optional(),
});

// Tipo inferido automaticamente
export type CreateClienteDto = z.infer<typeof createClienteSchema>;
