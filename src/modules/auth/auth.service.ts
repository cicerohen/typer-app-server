import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, USER_MODEL_NAME } from "../user/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: Model<UserDocument>
  ) {}

  signToken({ _id }) {
    return this.jwtService.sign({ _id });
  }

  decodeToken(token) {
    return this.jwtService.decode(token);
  }

  async buildAuthContext({ req }) {
    const { query, headers } = req;
    const { authorization } = headers || {};

    const access_token =
      query.access_token || (authorization && authorization.split(" ")[1]);

    const decodedToken = this.decodeToken(access_token);

    const user =
      decodedToken &&
      (await this.userModel.findById(decodedToken["_id"]).exec());

    return {
      auth: {
        access_token,
        user,
      },
    };
  }

  async signIn({ email, password }) {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw Error("User is not registered");
    }

    if (!user.verifyPassword(password)) {
      throw Error("Password is wrong");
    }

    return {
      access_token: this.signToken({ _id: user._id }),
    };
  }

  async signUp({ email, password }) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw Error("User already exists");
    }

    const newUser = new this.userModel({ email, password });
    await newUser.save();

    return {
      access_token: this.signToken({ _id: newUser._id }),
    };
  }
}
