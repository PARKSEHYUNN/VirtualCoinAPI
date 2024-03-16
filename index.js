// /index.js

// 모듈 선언
const express = require("express");
const path = require("path");

// 함수 선언
const {console} = require("./function");
const {swaggerUi, specs} = require("./swagger");

// 서버 선언
const app = express();

// 서버 설정
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 라우터 선언
const apiRouter = require("./router/api");

// 라우터 설정
app.use("/api", apiRouter);

// swagger 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 오류 페이지 설정
app.use((req, res) => {
    res.status(404).json({result: false, error: {errCode: 404, errMessage: "페이지를 찾을 수 없습니다."}});
    return;
});

// 서버 실행
app.listen(80, "0.0.0.0", () => {
    console.log("서버가 실행됬습니다.");
});