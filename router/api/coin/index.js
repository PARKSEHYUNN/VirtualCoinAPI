// /router/api/coin/index.js

// 모듈 선언
const router = require("express").Router();
const coinController = require("./coin.controller.js");

/**
 * @path {GET} http://127.0.0.1/api/coin/
 * @description 전체 코인 조회
 */
router.get("/", coinController.get);

/**
 * @path {GET} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 사용자 조회
 */
router.get("/:uuid", coinController.get_uuid);

/**
 * @path {POST} http://127.0.0.1/api/coin
 * @description 사용자 추가
 */
router.post("/", coinController.post);

/**
 * @path {PATCH} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 사용자 수정
 */
router.patch("/:uuid", coinController.patch);

/**
 * @path {DELETE} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 사용자 삭제
 */
router.delete("/:uuid", coinController.delete);

module.exports = router;