import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import {
  createClienteSchema,
  CreateClienteDto,
} from './dto/create-cliente.dto';
import { ZodError } from 'zod';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() body: unknown) {
    const parsed = createClienteSchema.safeParse(body);

    if (!parsed.success) {
      const error = parsed.error as ZodError;
      throw new BadRequestException(error.format());
    }

    return this.clienteService.create(parsed.data);
  }
}
