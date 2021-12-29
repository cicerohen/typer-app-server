import { join } from "path";
import { GqlModuleAsyncOptions } from "@nestjs/graphql";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";

export const gqlAsyncOptions: GqlModuleAsyncOptions = {
  
  imports: [AuthModule],
  useFactory: async (authService: AuthService) => ({
    autoSchemaFile: true,
    sortSchema: true,
    context: async (params) => {
      const authContext = await authService.buildAuthContext(params);
      return {
        ...params,
        ...authContext,
      };
    },
  }),
  inject: [AuthService],
};
