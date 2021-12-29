import * as mongoose from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, USER_MODEL_NAME } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: mongoose.Model<UserDocument>
  ) {}

  async add(user = {}) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async listAll() {
    return this.userModel.find().exec();
  }

  async update(user) {
    return this.userModel
      .findOneAndUpdate({ _id: user.id }, user, { new: true })
      .exec();
  }

  async delete(user) {
    return this.userModel.findOneAndDelete({ _id: user.id });
  }
}
