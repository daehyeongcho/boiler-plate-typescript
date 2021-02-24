import * as Mongoose from "mongoose";
import * as Bcrypt from "bcrypt";
const saltRounds = 10;

// salt를 이용해서 비밀번호를 암호화 해야함
// salt를 먼저 생성
// saltRounds: salt 자릿수

interface IUser {
  name?: string;
  email?: string;
  password?: string;
  lastname?: string;
  role?: Number;
  image?: string;
  token?: string;
  tokenExp?: string;
}

export interface IUserModel extends IUser, Mongoose.Document {}

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
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
UserSchema.pre<IUserModel>("save", function (next) {
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
    Bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      Bcrypt.hash(this.password, salt, (err, hash) => {
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

const User: Mongoose.Model<IUserModel> = Mongoose.model("User", UserSchema);

export default User;
