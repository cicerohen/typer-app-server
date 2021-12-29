import * as crypto from "crypto";
import { Schema, Document, HookNextFunction } from "mongoose";

export const USER_MODEL_NAME: string = "User";

export enum UserRole {
  "guest",
  "user"
}

export type UserDocument = Document & {
  name: {
    first: String;
    last: String;
  };
  email: string;
  roles: Array<UserRole>;
  salt: string;
  encryptedPassword: string;
  verifyPassword: (password: string) => Boolean;
}

export const UserSchema = new Schema<UserDocument>({
  name: {
    first: { type: String, default: "" },
    last: { type: String, default: "" },
  },
  email: { type: String, unique: true, lowercase: true },
  roles: {
    type: Array,
    default: ["user"],
  },
  salt: { type: String, default: "" },
  encryptedPassword: { type: String },
});


/**
 * Virtuals
 */

UserSchema.virtual("password")
  .get(getPassword)
  .set(setPassword);

/**
 * Instance methods
 */

UserSchema.methods.verifyPassword = function(password) {
  return encryptPassword(password, this.salt) === this.encryptedPassword;
};

/**
 * Hooks
 */

UserSchema.pre<UserDocument>("save", checkPasswordIsValid);


/**
 * Validations
 */

function makeSalt(): string {
  return crypto.randomBytes(16).toString("base64");
}

function encryptPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("base64");
}

function setPassword(password: string): void {
  this.salt = makeSalt();
  this._password = password;
  this.encryptedPassword = encryptPassword(this._password, this.salt);
}

function getPassword(): string {
  return this._password;
}

function checkPasswordIsValid(next: HookNextFunction): any {
  if (!this.isNew) {
    return next();
  }
  if (!this.encryptedPassword || !this.encryptedPassword.length) {
    return next(Error("Invalid password"));
  }
  next();
}
