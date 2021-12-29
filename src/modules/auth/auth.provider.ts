import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

export const authAsyncOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get("auth.secret"),
  }),
  inject: [ConfigService],
};
