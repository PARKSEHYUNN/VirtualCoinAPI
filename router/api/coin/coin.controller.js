// /router/api/coin/coin.controller.js

// 모듈 선언
const {sendQuery, checkDatas, checkOverlap, cryptoPassword, createUUID, checkDatasPatch} = require("../../../function");

/**
 * @path {GET} http://127.0.0.1/api/coin/
 * @description 전체 코인 조회
 */
exports.get = async (req, res) => {
    // 변수 선언
    let sql, row;

    // 코인 정보 받아오기
    sql = "SELECT id, name, uuid FROM COIN;";
    row = await sendQuery(sql);

    // 결과 반환
    return res.status(200).json({result: true, coins: row});
};

/**
 * @path {GET} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 코인 조회
 */
exports.get_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;

    // 코인 정보 받아오기
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 코인이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "코인을 찾을 수 없습니다."}});

    // 결과 반환
    return res.status(200).json({result: true, coin: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/user
 * @description 코인 추가
 */
exports.post = async (req, res) => {
    let sql, row;
    let {name, count, value} = req.body;

    // 입력 값 확인
    let checkData = checkDatas("coin", req.body);
    if(!checkData.result)
        return res.status(400).json({result: false, error: checkData.error});

    // 중복 확인
    sql = `SELECT name FROM COIN WHERE name = ?;`;
    row = await sendQuery(sql, [name]);

    let overlap = checkOverlap("coin", req.body, row);
    if(!overlap.result)
        return res.status(400).json({result: false, error: overlap.error});

    // UUID 생성
    let uuid = createUUID();

    // 사용자 데이터 업로드
    sql = `INSERT INTO COIN(name, count, value, uuid) VALUES(?, ?, ?, ?);`
    row = await sendQuery(sql, [name, count, value, uuid]);

    // 업로드 실패
    if(row.affectedRows != 1) 
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});
    
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);
    
    // 결과 반환
    return res.status(200).json({result: true, coin: row[0]});
}

/**
 * @path {PATCH} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 코인 수정
 */
exports.patch = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;
    let {name, count, value} = req.body;

    // 코인 정보 받아오기
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 코인이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "코인을 찾을 수 없습니다."}});

    // 입력 값 확인
    let checkData = checkDatasPatch("coin", req.body)
    if(!checkData.result)
        return res.status(400).json({result: false, error: checkData.error});

    // 중복 확인
    sql = `SELECT name FROM COIN WHERE name = ?;`;
    row = await sendQuery(sql, [name]);

    let overlap = checkOverlap("coin", req.body, row);
    if(!overlap.result)
        return res.status(400).json({result: false, error: overlap.error});

    // 코인 데이터 업데이트
    checkData.data.dataArray.push(uuid);
    row = await sendQuery(checkData.data.sql, checkData.data.dataArray);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 결과 반환
    return res.status(200).json({result: true, coin: row[0]});
};

/**
 * @path {DELETE} http://127.0.0.1/api/coin/{uuid}
 * @description 특정 코인 삭제
 */
exports.delete = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;

    // 코인 정보 받아오기
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 코인이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "코인을 찾을 수 없습니다."}});

    // 코인 데이터 삭제
    sql = `DELETE FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 삭제 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    // 결과 반환
    return res.status(200).json({result: true});
};