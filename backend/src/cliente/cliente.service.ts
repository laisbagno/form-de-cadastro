import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';

const prisma = new PrismaClient();

@Injectable()
export class ClienteService {
  async create(data: CreateClienteDto) {
    const existing = (await prisma.cliente.findFirst({
      where: {
        OR: [{ cpf: data.cpf }, { email: data.email }],
      },
    })) as { cpf: string; email: string } | null;

    if (existing) {
      if (existing.cpf === data.cpf) {
        throw new ConflictException('CPF já cadastrado');
      }
      if (existing.email === data.email) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    const cliente = await prisma.cliente.create({
      data,
    });

    return {
      message: 'Cadastro realizado com sucesso',
      cliente,
    };
  }
}
