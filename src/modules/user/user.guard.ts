import * as mongoose from "mongoose";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, USER_MODEL_NAME } from "./user.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: mongoose.Model<UserDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { auth } = context.getArgByIndex(2) || {};
    const roles = this.reflector.get("roles", context.getHandler());
    
    if (!roles) {
      return true;
    }

    const decodedToken = this.authService.decodeToken(auth.access_token);

    if (!decodedToken) {
      return false;
    }

    const user = await this.userModel
      .findOne({ _id: decodedToken["_id"], roles: { $in: roles } })
      .exec();

    if (!user) {
      return false;
    }

    return true;
  }
}
