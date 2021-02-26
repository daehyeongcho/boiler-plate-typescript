import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastname?: string;
  role?: Number;
  image?: string;
  token?: string;
  tokenExp?: string;
}

// methods 타입은 Document에
export interface IUserDocument extends IUser, Document {
  comparePassword: (
    this: IUserDocument,
    plainPassword: string,
    next: (err: Error | null, isMatch?: boolean) => void
  ) => void;
  generateToken: (
    this: IUserDocument,
    next: (err: Error | null, user?: IUserDocument) => void
  ) => void;
}

// statics 타입은 Model에
export interface IUserModel extends Model<IUserDocument> {
  findByToken: (
    this: IUserModel,
    token: string,
    next: (err: Error | null, user?: IUserDocument) => void
  ) => void;
}
