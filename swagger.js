// /swagger.js

// 모듈 선언
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// swagger 설정
const swaggerSpecs = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Virtual Coin API",
            description: "Virtual Coin REST API Server"
        },
        servers: [{
            url: "http://127.0.0.1"
        }],
        tags: [
            {
                name: "User",
                description: "사용자 조회, 추가, 수정, 삭제"
            },
            {
                name: "Coin",
                description: "코인 조회, 추가, 수정, 삭제"
            },
            {
                name: "Wallet",
                description: "코인 구매, 판매, 지갑 조회"
            }
        ],
        paths: {
            "/api/user/": require("./swagger/user/user"),
            "/api/user/{uuid}": require("./swagger/user/user_uuid"),
            "/api/coin/": require("./swagger/coin/coin"),
            "/api/coin/{uuid}": require("./swagger/coin/coin_uuid"),
            "/api/wallet/{uuid}": require("./swagger/wallet/wallet_uuid"),
            "/api/wallet/plus/coin/{uuid}": require("./swagger/wallet/wallet_plus_coin_uuid"),
            "/api/wallet/plus/money/{uuid}": require("./swagger/wallet/wallet_plus_money_uuid"),
            "/api/wallet/minus/coin/{uuid}": require("./swagger/wallet/wallet_minus_coin_uuid"),
            "/api/wallet/minus/money/{uuid}": require("./swagger/wallet/wallet_minus_money_uuid")
        }
    },
    apis: ["./router/*,js"]
};

let swaggerSetting = (a, b) => {
    var methodsOrder = ["get", "post", "put", "patch", "delete", "options", "trace"];
    var result = methodsOrder.indexOf(a.get("method")) - methodsOrder.indexOf(b.get("method"));

    if (result === 0) {
        result = a.get("path").localeCompare(b.get("path"));
    }

    return result;
}

const specs = swaggerJsdoc(swaggerSpecs);

module.exports = {swaggerUi, specs, swaggerSetting};