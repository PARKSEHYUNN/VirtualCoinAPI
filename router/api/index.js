// /router/api/index.js

// 모듈 선언
const router = require("express").Router();

// 라우터 선언
const userRouter = require("./user");

// 라우터 설정
router.use("/user", userRouter);

module.exports = router;