// /router/api/user/index.js

// 모듈 선언
const router = require("express").Router();
const userController = require("./user.controller.js");

/**
 * @path {GET} http://127.0.0.1/api/user/
 * @description 전체 사용자 조회
 */
router.get("/", userController.get);

/**
 * @path {GET} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 조회
 */
router.get("/:uuid", userController.get_uuid);

/**
 * @path {POST} http://127.0.0.1/api/user
 * @description 사용자 추가
 */
router.post("/", userController.post);

/**
 * @path {PATCH} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 수정
 */
router.patch("/:uuid", userController.patch);

/**
 * @path {DELETE} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 삭제
 */
router.delete("/:uuid", userController.delete);

module.exports = router;