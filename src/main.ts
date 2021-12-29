import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./modules/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "debug", "error", "verbose", "warn"],
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get("port"));
}
bootstrap();
