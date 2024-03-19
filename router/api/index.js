// /router/api/index.js

// 모듈 선언
const router = require("express").Router();

// 라우터 선언
const userRouter = require("./user");
const coinRouter = require("./coin");
const walletRouter = require("./wallet");

// 라우터 설정
router.use("/user", userRouter);
router.use("/coin", coinRouter);
router.use("/wallet", walletRouter);

module.exports = router;