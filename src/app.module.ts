import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { MongooseConfigModule } from "./modules/mongoose-config/mongoose-config.module";
import { GQLConfigModule } from "./modules/gql-config/gql-config.module";
import { ConfigModule } from "./modules/config/config.module";
@Module({
  imports: [
    GQLConfigModule,
    MongooseConfigModule,
    UserModule,
    ConfigModule
  ],
})

export class AppModule {}
