// /router/api/user/index.js

// 모듈 선언
const router = require("express").Router();
const userController = require("./user.controller.js");

/**
 * @path {GET} http://127.0.0.1/api/user/
 * @description 사용자 목록 조회
 */
router.get("/", userController.get);

module.exports = router;