import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { gqlAsyncOptions } from "./gql-config.provider";

@Module({
  imports: [GraphQLModule.forRootAsync(gqlAsyncOptions)],
})
export class GQLConfigModule {}
