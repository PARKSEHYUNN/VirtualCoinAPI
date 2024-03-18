// /router/api/user/user.controller.js

// 모듈 선언
const {sendQuery, checkDatas, checkOverlap, cryptoPassword, createUUID} = require("../../../function");

/**
 * @path {GET} http://127.0.0.1/api/user/
 * @description 전체 사용자 조회
 */
exports.get = async (req, res) => {
    // 변수 선언
    let sql, row;

    // 사용자 정보 받아오기
    sql = "SELECT id, username, uuid FROM USER;";
    row = await sendQuery(sql);

    // 결과 반환
    return res.status(200).json({result: true, users: row});
};

/**
 * @path {GET} http://127.0.0.1/api/user/{id}
 * @description 특정 사용자 조회
 */
exports.get_id = async (req, res) => {
    // 변수 선언
    let sql, row;
    let id = req.params.id;

    // 사용자 정보 받아오기
    sql = `SELECT * FROM USER WHERE id = ?;`;
    row = await sendQuery(sql, [id]);

    // 사용자가 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 결과 반환
    return res.status(200).json({result: true, user: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/user
 * @description 사용자 추가
 */
exports.post = async (req, res) => {
    let sql, row;
    let {username, password, email} = req.body;

    // 입력 값 확인
    let checkData = checkDatas("user", req.body);
    if(!checkData.result)
        return res.status(400).json({result: false, error: checkData.error});

    // 중복 확인
    sql = `SELECT username, email FROM USER WHERE username = ? OR email = ?;`;
    row = await sendQuery(sql, [username, email]);

    let overlap = checkOverlap("user", req.body, row);
    if(!overlap.result)
        return res.status(400).json({result: false, error: overlap.error});

    // 사용자 비밀번호 암호화
    let crypto = cryptoPassword(password);

    // UUID 생성
    let uuid = createUUID();

    // 사용자 데이터 업로드
    sql = `INSERT INTO USER(username, password_key, password_salt, email, uuid) VALUES(?, ?, ?, ?, ?);`
    row = await sendQuery(sql, [username, crypto.password_key, crypto.password_salt, email, uuid]);

    // 업로드 실패
    if(row.affectedRows != 1) 
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});
    
    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);
    
    // 결과 반환
    return res.status(200).json({result: true, user: row[0]});
}