const functions = require("firebase-functions");
const firebase = require("firebase");
const pool = require("./util/pool");
firebase.initializeApp(pool);

const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

const cors = require("cors");
app.use(cors()); // for firebase deploy

console.log("> server connected");

// 아래를 참고
// https://github.com/hidjou/classsed-react-firebase-functions/tree/master/functions
// https://firebase.google.com/docs/samples/?authuser=0
const { fbAuth, db } = require("./util/admin");

// 모든 기능이 아닌 기능 따로따로 배포하려면
// firebase deploy --only functions:func1,functions:func2

const posts = require("./handlers/posts");
app.get("/posts/getpostsfromlist/:page", posts.getPostsFromList);
app.post("/posts/createpost", fbAuth, posts.createPost);
app.post("/posts/editpost/:idx", fbAuth, posts.editPost);
app.get("/posts/getpost/:idx", posts.getPost);
app.post("/posts/disablepost/:idx", fbAuth, posts.disablePost);

const comments = require("./handlers/comments");
app.get("/comments/getcommentsfrompost/:idx", comments.getCommentsFromPost);
app.post("/comments/addcommenttopost/:idx", fbAuth, comments.addCommentToPost);

const likes = require("./handlers/likes");
app.post("/likes/addliketopost/:idx/:cond", fbAuth, likes.addLikeToPost);
app.post(
  "/likes/getselflikequantityfrompost/:postIdx",
  fbAuth,
  likes.getSelfLikeQuantityFromPost,
);

const users = require("./handlers/users");
app.post("/users/signup", users.signUp);
app.post("/users/signin", users.signIn);
app.post("/users/getuserdetails", fbAuth, users.getUserDetails);
app.post("/users/adduserdetails", fbAuth, users.addUserDetails);
app.post("/users/image", fbAuth, users.uploadImg);

// exports.unDeploy = {}
exports.api = functions.https.onRequest(app);

// const events = require("./handlers/events");
// exports.createNotifOnLike = events.createNotifOnLike;
// exports.deleteNotifOnUnlike = events.deleteNotifOnUnlike;

// firebase-busboy 이해: http://ghcksdk.com/firebase-express-multipart-form/
// 이미지파일을 브라우저에서 서버로 전송하기 위해서는 폼에 enctype="multipart/form-data" 를 추가해서 인코딩 타입을 multipart로 해줘야 한다.
// cloud functions에서는 요청의 body를 req.body가 아니라 req.rawBody에 저장한다.
// multer와 비슷한 역할을 하는 미들웨어인 busBoy를 사용하여 req.rawBody를 넘겨주니 정상적으로 파일을 읽을 수 있었다.
// https://qiita.com/toshi0607/items/c4440d3fbfa72eac840c

// TODO:
// https://www.youtube.com/watch?v=m_u6P5k0vP0&t=1989s
// 에러쉽게 만드는 모듈: https://www.npmjs.com/package/http-errors
// res.status(400).json 하는거보다 next(errorWithStatusAndMessage) 식으로 하는게 나음
// https://expressjs.com/en/guide/error-handling.html
// csurf, helmet 모듈 사용, 유저 요청 validate, sanitize

// // 시작 테스트
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// // 기본 구문
// // exports.getMessage = functions.https.onRequest(async (req, res) => {
// // app.get("/messages", async (req, res) => {
// // exports.api = functions.https.onRequest(app);

// // ⏩테스트: $ firebase emulators:start
