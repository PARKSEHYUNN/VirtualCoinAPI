// /router/api/wallet/index.js

// 모듈 선언
const router = require("express").Router();
const walletController = require("./wallet.controller.js");

/**
 * @path {GET} http://127.0.0.1/api/wallet/{uuid}
 * @description 특정 사용자 지갑 조회
 */
router.get("/:uuid", walletController.get_uuid);

/**
 * @path {POST} http://127.0.0.1/api/wallet/plus/coin/{uuid}
 * @description 특정 사용자 코인 증가
 */
router.post("/plus/coin/:uuid", walletController.post_plus_coin_uuid);

/**
 * @path {POST} http://127.0.0.1/api/wallet/plus/money/{id}
 * @description 특정 사용자 돈 증가
 */
router.post("/plus/money/:uuid", walletController.post_plus_money_uuid);

/**
 * @path {POST} http://127.0.0.1/api/wallet/minus/coin/{uuid}
 * @description 특정 사용자 코인 감소
 */
router.post("/minus/coin/:uuid", walletController.post_minus_coin_uuid);

/**
 * @path {POST} http://127.0.0.1/api/wallet/minus/money/{uuid}
 * @description 특정 사용자 돈 감소
 */
router.post("/minus/money/:uuid", walletController.post_minus_money_uuid);

module.exports = router;