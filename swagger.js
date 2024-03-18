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
            "/api/user/": require("./swagger/user/get"),
            "/api/user/{id}": require("./swagger/user/get_id")
        }
    },
    apis: ["./router/*,js"]
};

const specs = swaggerJsdoc(swaggerSpecs);

module.exports = {swaggerUi, specs};