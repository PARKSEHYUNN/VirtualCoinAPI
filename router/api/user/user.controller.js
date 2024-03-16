// /router/api/user/user.controller.js

/**
 * @path {GET} http://127.0.0.1/api/user/
 * @description 사용자 목록 조회
 */
exports.get = async (req, res) => {
    res.status(200).json({result: true})
}