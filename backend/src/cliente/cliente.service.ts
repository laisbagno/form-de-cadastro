import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';

const prisma = new PrismaClient();

@Injectable()
export class ClienteService {
  async create(data: CreateClienteDto) {
    // Verifica se o CPF já existe
    const existing = await prisma.cliente.findUnique({
      where: { cpf: data.cpf },
    });

    if (existing) {
      throw new ConflictException('CPF já cadastrado');
    }

    // Cria o cliente
    const cliente = await prisma.cliente.create({
      data,
    });

    console.log('cliente', cliente)

    return {
      message: 'Cadastro realizado com sucesso',
      cliente,
    };
  }
}
