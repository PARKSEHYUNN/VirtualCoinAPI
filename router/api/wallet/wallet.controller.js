// /router/api/coin/coin.controller.js

// 모듈 선언
const {sendQuery, checkDatas, checkOverlap, createUUID, checkDatasPatch} = require("../../../function");

/**
 * @path {GET} http://127.0.0.1/api/wallet/{id}
 * @description 특정 사용자 지갑 조회
 */
exports.get_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let uuid = req.params.uuid;

    // 지갑 정보 받아오기
    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 지갑이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "지갑을 찾을 수 없습니다."}});

    // Coins 변환
    row[0].coins = JSON.parse(row[0].coins)

    // 결과 반환
    return res.status(200).json({result: true, wallet: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/wallet/plus/coin/{id}
 * @description 특정 사용자 코인 증가
 */
exports.post_plus_coin_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let user_uuid = req.params.uuid;
    let {uuid, count} = req.body;

    // 변수 형 변환
    count = parseInt(count);

    // 지갑 정보 받아오기
    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // 지갑이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 지갑 코인 정보 저장
    let wallet_data = JSON.parse(row[0].coins);

    // 코인 정보 받아오기
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 코인이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "코인을 찾을 수 없습니다."}});

    // 코인 정보 저장
    let coin_data = row[0];

    // 지갑 코인 UUID 확인
    for(let i = 0; i < wallet_data.length; i ++){
        let coin_uuid = wallet_data[i].uuid;
        let coin_count = wallet_data[i].count;

        // 요청한 코인과 지갑에 있는 코인이 같으면
        if(coin_uuid == uuid) count = count + coin_count;
    }

    // 코인 가격 계산
    let value = coin_data.value * count;

    // 지갑 코인 수정
    for(let j = 0; j < wallet_data.length; j ++){
        let coin_uuid = wallet_data[j].uuid;

        // 요청한 코인과 지갑에 있는 코인이 같으면
        if(coin_uuid == uuid){
            wallet_data[j].count = count;
            wallet_data[j].value = value;
        }
    }

    // 지갑 코인 업로드
    sql = `UPDATE WALLET SET coins = ? WHERE uuid = ?;`;
    row = await sendQuery(sql, [JSON.stringify(wallet_data), user_uuid]);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // Coins 변환
    row[0].coins = JSON.parse(row[0].coins)

    // 결과 반환
    res.status(200).json({result: true, wallet: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/wallet/plus/money/{id}
 * @description 특정 사용자 돈 증가
 */
exports.post_plus_money_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let user_uuid = req.params.uuid;
    let {value} = req.body;

    // 변수 형 변환
    value = parseInt(value);

    // 지갑 정보 받아오기
    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // 지갑이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 지갑 돈 정보 저장
    let wallet_data = parseInt(row[0].money);

    // 금액 만큼 증가
    wallet_data = wallet_data + value;

    // 지갑 돈 업로드
    sql = `UPDATE WALLET SET money = ? WHERE uuid = ?;`;
    row = await sendQuery(sql, [wallet_data, user_uuid]);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // Coins 변환
    row[0].coins = JSON.parse(row[0].coins)

    // 결과 반환
    res.status(200).json({result: true, wallet: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/wallet/minus/coin/{id}
 * @description 특정 사용자 코인 증가
 */
exports.post_minus_coin_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let user_uuid = req.params.uuid;
    let {uuid, count} = req.body;

    // 변수 형 변환
    count = parseInt(count);

    // 지갑 정보 받아오기
    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // 지갑이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 지갑 코인 정보 저장
    let wallet_data = JSON.parse(row[0].coins);

    // 코인 정보 받아오기
    sql = `SELECT * FROM COIN WHERE uuid = ?;`;
    row = await sendQuery(sql, [uuid]);

    // 코인이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "코인을 찾을 수 없습니다."}});

    // 코인 정보 저장
    let coin_data = row[0];

    console.log(count)

    // 지갑 코인 UUID 확인
    for(let i = 0; i < wallet_data.length; i ++){
        let coin_uuid = wallet_data[i].uuid;
        let coin_count = wallet_data[i].count;

        // 요청한 코인과 지갑에 있는 코인이 같으면
        if(coin_uuid == uuid) count = coin_count - count;
    }

    console.log(count)

    // 코인이 0 보다 작으면
    if(count < 0)
        return res.status(400).json({result: false, error: {errCode: 1, errMessage: "코인 보유량이 음수일 수 없습니다."}});

    // 코인 가격 계산
    let value = coin_data.value * count;

    // 지갑 코인 수정
    for(let j = 0; j < wallet_data.length; j ++){
        let coin_uuid = wallet_data[j].uuid;

        // 요청한 코인과 지갑에 있는 코인이 같으면
        if(coin_uuid == uuid){
            wallet_data[j].count = count;
            wallet_data[j].value = value;
        }
    }

    // 지갑 코인 업로드
    sql = `UPDATE WALLET SET coins = ? WHERE uuid = ?;`;
    row = await sendQuery(sql, [JSON.stringify(wallet_data), user_uuid]);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // Coins 변환
    row[0].coins = JSON.parse(row[0].coins)

    // 결과 반환
    res.status(200).json({result: true, wallet: row[0]});
};

/**
 * @path {POST} http://127.0.0.1/api/wallet/minus/money/{id}
 * @description 특정 사용자 돈 감소
 */
exports.post_minus_money_uuid = async (req, res) => {
    // 변수 선언
    let sql, row;
    let user_uuid = req.params.uuid;
    let {value} = req.body;

    // 변수 형 변환
    value = parseInt(value);

    // 지갑 정보 받아오기
    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // 지갑이 없는 경우
    if(row.length == 0) return res.status(400).json({result: false, error: {errCode: 0, errMessage: "사용자를 찾을 수 없습니다."}});

    // 지갑 돈 정보 저장
    let wallet_data = parseInt(row[0].money);

    // 금액 만큼 증가
    wallet_data = wallet_data - value;

    // 돈이 0보다 적으면
    if(wallet_data < 0)
        return res.status(400).json({result: false, error: {errCode: 2, errMessage: "돈이 음수일 수 없습니다."}});

    // 지갑 돈 업로드
    sql = `UPDATE WALLET SET money = ? WHERE uuid = ?;`;
    row = await sendQuery(sql, [wallet_data, user_uuid]);

    // 업데이트 실패
    if(row.affectedRows != 1)
        return res.status(400).json({result: false, error: {errCode: -2, errMessage: "데이터베이스에 연결할 수 없습니다."}});

    sql = `SELECT * FROM WALLET WHERE uuid = ?;`;
    row = await sendQuery(sql, [user_uuid]);

    // Coins 변환
    row[0].coins = JSON.parse(row[0].coins)

    // 결과 반환
    res.status(200).json({result: true, wallet: row[0]});
};