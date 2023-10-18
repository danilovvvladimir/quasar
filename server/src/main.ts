import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = 4444;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
  await app.listen(PORT);
}
bootstrap();
