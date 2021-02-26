import express, { application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { UserModel, IUserDocument } from "./models/users";
import auth from "./middleware/auth";

const app: express.Application = express();
const port = process.env.PORT || 3000;

const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/users/register", (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const users = new UserModel(req.body);
  users.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.

  UserModel.findOne(
    { email: req.body.email },
    (err: Error, user: IUserDocument) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
      // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다",
          });

        // 비밀번호까지 맞다면 토큰을 생성하기
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등 (여기서는 쿠키)
          if (user) {
            res
              .cookie("x_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          }
        });
      });
    }
  );
});

app.get("/api/users/auth", auth, (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  }
});

app.post("/api/users/logout", auth, (req, res) => {
  // 로그아웃하려는 유저를 데이터베이스에서 찾아서
  // 그 유저의 토큰을 지워준다
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      {},
      (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
      }
    );
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
