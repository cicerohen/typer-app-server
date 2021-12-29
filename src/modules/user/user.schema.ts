import { Field, ObjectType, InputType } from "@nestjs/graphql";

@ObjectType()
export class UserName {
  @Field()
  first: string;

  @Field()
  last: string;
}

@ObjectType()
export class User {
  @Field()
  name: UserName;

  @Field()
  id: string;

  @Field()
  email: string;
}


@InputType()
export class UserNameInput {
  @Field({ defaultValue: "" })
  first: string;
  @Field({ defaultValue: "" })
  last: string;
}

@InputType()
export class AddUserInput {
  @Field({ nullable: true })
  name: UserNameInput;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: UserNameInput;

}

@InputType()
export class DeleteUserInput {
  @Field()
  id: string;
}
