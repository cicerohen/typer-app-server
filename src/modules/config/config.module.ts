import { Module } from "@nestjs/common";
import { ConfigModule as NestJSConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";

import config from "./config";

@Module({
  imports: [
    NestJSConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
