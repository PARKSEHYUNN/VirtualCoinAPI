// /function.js

// 모듈 선언
const chalk = require("chalk");

/**
 * 메세지 출력
 * @param {string} message 출력할 메세지
 * @returns 출력
 */
exports.console = { log: (message) => console.log(chalk.bgWhite(`[ SERVER ] ${message}`))};
