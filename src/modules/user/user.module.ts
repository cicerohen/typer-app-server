import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { ConfigModule } from "../config/config.module";
import { AuthModule } from "../auth/auth.module";
import { UserSchema, USER_MODEL_NAME } from "./user.model";

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: USER_MODEL_NAME,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
