import { Field, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;
}


@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SignUpInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


