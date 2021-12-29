import { UseGuards, SetMetadata } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserRoles } from "./user.decorator";
import { UserRoleGuard } from "./user.guard";

import { UserService } from "./user.service";
import { User } from "./user.schema";
import {
  AddUserInput,
  UpdateUserInput,
  DeleteUserInput,
} from "./user.schema";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UserRoles("admin")
  // @UseGuards(UserRoleGuard)
  @Query(() => [User])
  async users() {
    return this.userService.listAll();
  }

  @Query(() => [User])
  async me() {
    return [];
  }

  @Mutation(() => User)
  async addUser(@Args("input") input: AddUserInput) {
    return this.userService.add(input);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(@Args("input") input: UpdateUserInput) {
    return this.userService.update(input);
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args("input") input: DeleteUserInput) {
    return this.userService.delete(input);
  }
}
