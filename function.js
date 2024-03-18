// /function.js

// 모듈 선언
const chalk = require("chalk");
const mysql = require("mysql2/promise");
const crypto = require("crypto");

// 함수 선언
const {v4} = require("uuid");

// 오류 선언
const errCode = require("./errCode");

// 데이터베이스 설정
const DATABASE_CONFIG = {
    host: process.env.DATABASE_ADDRESS,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    connectionLimit: process.env.DATABASE_CONN_LIMIT
}
let pool = mysql.createPool(DATABASE_CONFIG);

/**
 * 메세지 출력
 * @param {string} message 출력할 메세지
 * @returns 출력
 */
exports.console = { log: (message) => console.log(chalk.bgWhite(`[ SERVER ] ${message}`))};

/**
 * 데이터베이스 서버에 SQL문을 실행 후 결과를 반환한다.
 * @param {string} sql SQL문
 * @returns SQL문 실행 결과
 */
exports.sendQuery = async (sql, values = []) => {
    let conn = await pool.getConnection(async conn => conn);
    let [rows] = await conn.query(sql, values);

    conn.release();
    return rows;
}

/**
 * 검사가 필요한 Object를 받아 검사 결과를 반환
 * @param {string} stat 함수가 사용된 위치
 * @param {object} datas 검사가 필요한 Object
 * @returns 결과 값이 담긴 Object
 */
exports.checkDatas = (stat, datas) => {
    // 변수 선언
    let dataKey = Object.keys(datas);

    for(let i = 0; i < dataKey.length; i ++){
        let data = datas[dataKey[i]]

        if(data == "" || data == undefined)
            return {result: false, error: errCode[stat][dataKey[i]]["undefined"]};

        if(!this.checkSyntax(dataKey[i], data))
            return {reslt: false, error: errCode[stat][dataKey[i]]["syntax"]};
    }

    // 결과 반환
    return {result: true};
}

/**
 * 해당 데이터에 맞는 규칙을 적용후 결과 반환
 * @param {string} dataKey 데이터 이름
 * @param {*} data 데이터 값
 * @returns 결과 값
 */
exports.checkSyntax = (dataKey, data) => {
    // 변수 선언
    let regExp;

    if(dataKey == "username") regExp = /^[a-z|A-Z|0-9]+$/;
    else if(dataKey == "password") return true;
    else if(dataKey == "email") regExp = /^[a-z|A-Z|0-9|.@]+$/;
    else return false;
    
    if(regExp.test(data)) return true;
    else return false;
};

/**
 * 
 * @param {string} stat 함수가 사용된 위치
 * @param {object} datas 검사가 필요한 Object
 * @param {object} row SQL 결과 값
 * @returns 
 */
exports.checkOverlap = (stat, datas, row) => {
    for(let i = 0; i < row.length; i ++){
        let dataKeys = Object.keys(row[i]);

        for(j = 0; j < dataKeys.length; j ++){
            console.log(stat, datas[dataKeys[j]])
            if(row[i][dataKeys[j]] == datas[dataKeys[j]])
                return {result: false, error: errCode[stat][dataKeys[j]]["overlap"]};
        }
    }

    return {result: true}
}

/**
 * 비밀번호를 암호화 하여 비밀번호 암호화문과 비밀번호 추가문장을 반환한다.
 * @param {string} password 비밀번호 평문
 * @param {string} password_salt 비밀번호 추가 문장
 * @returns 비밀번호 암호화문, 비밀번호 추가 문장
 */
exports.cryptoPassword = (password, password_salt) => {
    // 변수 선언
    let password_salt_check = password_salt == undefined ? crypto.pseudoRandomBytes(64).toString(`base64`) : password_salt;
    let password_key = crypto.pbkdf2Sync(password, password_salt_check, 27462, 64, `SHA512`).toString(`base64`);

    return {password_key: password_key, password_salt: password_salt_check};
}

/**
 * 사용자의 UUID를 생성해 반환한다.
 * @returns UUID
 */
exports.createUUID = () => {
    return v4();
}