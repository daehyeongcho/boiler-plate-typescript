import { IUser, IUserDocument, IUserModel } from "./types";
import { Schema, Model, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
// salt를 이용해서 비밀번호를 암호화 해야함
// salt를 먼저 생성
// saltRounds: salt 자릿수

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
// user.save 하기 전에 콜백 실행
UserSchema.pre("save", function (next) {
  // mongoose schema의 pre hook은 콜백으로
  // arrow function을 사용하면 안된다!
  // arrow function은 this를 바인딩하지 않기 때문에
  // window 객체를 가리키게 됨.
  // 대신 예전 스타일로 var user = this; 쓰는 대신에
  // 밑의 콜백들은 arrow function을 사용해주면
  // 상위의 this를 가리키기 때문에 자연스럽게
  // 모두 같은 userSchema를 가리킴

  // name, email 등등 말고 password가 바뀔때만 암호화
  if (this.isModified("password")) {
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
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
