import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera CORS para todas as origens (ou só para o seu frontend se preferir)
  app.enableCors({
    origin: "http://localhost:5173",
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
