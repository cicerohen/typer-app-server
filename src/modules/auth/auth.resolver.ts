import { Resolver, Mutation, Args } from "@nestjs/graphql";

import { AuthResponse } from "./auth.schema";
import { SignInInput, SignUpInput } from "./auth.schema";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signIn(@Args("input") input: SignInInput) {
    return this.authService.signIn(input);
  }

  @Mutation(() => AuthResponse)
  async signUp(@Args("input") input: SignUpInput) {
    return this.authService.signUp(input);
  }
}
