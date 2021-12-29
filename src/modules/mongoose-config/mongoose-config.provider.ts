import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

export const mongooseAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>("mongo.uri"),
    useFindAndModify: false,
  }),
  inject: [ConfigService],
};
