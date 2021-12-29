import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { authAsyncOptions } from "./auth.provider";

import { UserSchema, USER_MODEL_NAME } from "../user/user.model";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(authAsyncOptions),
    MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
