import { IUser, IUserDocument, IUserModel } from "./types";
import { Schema, Model, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "secretToken";

export const UserSchema: Schema<IUserDocument> = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

UserSchema.methods.comparePassword = function (
  this: IUserDocument,
  plainPassword: string,
  next: (err: Error | null, isMatch?: boolean) => void
) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (
  this: IUserDocument,
  next: (err: Error | null, user?: IUserDocument) => void
) {
  // jsonwebtoken을 이용해서 token 생성하기
  // jwt.sign(payload, secretKey)에서 payload는 string이어야함
  // mongodb에서 생성된 _id는 string이 아니기때문에 형변환해주어야 한다.
  const token = jwt.sign(this._id.toHexString(), secret);
  this.token = token;
  this.save((err, user) => {
    if (err) return next(err);
    next(null, user);
  });
};

UserSchema.statics.findByToken = function (
  token: string,
  next: (err: Error | null, user?: IUserDocument) => void
) {
  // 토큰을 decode한다.
  jwt.verify(token, secret, (err: any, decoded: any) => {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    UserModel.findOne(
      { _id: decoded, token: token },
      (err: Error, user: IUserDocument) => {
        if (err) return next(err);
        next(null, user);
      }
    );
  });
};

export const UserModel = model<IUserDocument, IUserModel>("user", UserSchema);
