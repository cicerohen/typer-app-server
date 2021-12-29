import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseAsyncOptions } from "./mongoose-config.provider";

@Module({
  imports: [MongooseModule.forRootAsync(mongooseAsyncOptions)],
})
export class MongooseConfigModule {}
