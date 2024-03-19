// /router/api/user/user.controller.js

// 모듈 선언
const {sendQuery, checkDatas, checkOverlap, cryptoPassword, createUUID, checkDatasPatch} = require("../../../function");

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
 * @path {GET} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 조회
 */
exports.get_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;

    // 사용자 정보 받아오기
    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

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
    
    // 사용자 지갑 업로드
    let coins = [
        {
            "name": "슬라임 코인",
            "count": 0,
            "value": 0,
            "uuid": "f5c390e6-abe5-45e9-b2c4-5061168add1e"
        },
        {
            "name": "주황버섯 코인",
            "count": 0,
            "value": 0,
            "uuid": "7e0a8d1b-07c2-4932-ac94-0ab946bf0632"
        },
        {
            "name": "예티 코인",
            "count": 0,
            "value": 0,
            "uuid": "52438b4c-8234-412d-a458-d56696b651b0"
        },
        {
            "name": "발록 코인",
            "count": 0,
            "value": 0,
            "uuid": "253fff5a-386d-4961-83b6-69b37a9b773f"
        },
        {
            "name": "자쿰 코인",
            "count": 0,
            "value": 0,
            "uuid": "f49b20e2-6cd5-4c59-b2db-dc7e4ef3bff3"
        },
        {
            "name": "핑크빈 코인",
            "count": 0,
            "value": 0,
            "uuid": "1841a168-433b-40c4-b46f-0a4e288bd647"
        },
    ]
    sql = `INSERT INTO WALLET(money, coins, uuid) VALUES(?, ?, ?);`;
    row = await sendQuery(sql, [10000, JSON.stringify(coins), uuid]);

    // 업로드 실패
    if(row.affectedRows != 1) 
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);
    
    // 결과 반환
    return res.status(200).json({result: true, user: row[0]});
}

/**
 * @path {PATCH} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 수정
 */
exports.patch = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;
    let {username, password, email} = req.body;

    // 사용자 정보 받아오기
    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 사용자가 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 입력 값 확인
    let checkData = checkDatasPatch("user", req.body)
    if(!checkData.result)
        return res.status(400).json({result: false, error: checkData.error});

    // 중복 확인
    sql = `SELECT username, email FROM USER WHERE username = ? OR email = ?;`;
    row = await sendQuery(sql, [username, email]);

    let overlap = checkOverlap("user", req.body, row);
    if(!overlap.result)
        return res.status(400).json({result: false, error: overlap.error});

    // 사용자 데이터 업데이트
    checkData.data.dataArray.push(uuid);
    row = await sendQuery(checkData.data.sql, checkData.data.dataArray);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 결과 반환
    return res.status(200).json({result: true, user: row[0]});
};

/**
 * @path {DELETE} http://127.0.0.1/api/user/{uuid}
 * @description 특정 사용자 삭제
 */
exports.delete = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;

    // 사용자 정보 받아오기
    sql = `SELECT * FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 사용자가 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 사용자 데이터 삭제
    sql = `DELETE FROM USER WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 삭제 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    // 사용자 지갑 삭제
    sql = `DELETE FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 삭제 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    // 결과 반환
    return res.status(200).json({result: true});
};