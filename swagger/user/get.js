// /swagger/user/get.js

module.exports = {
    get: {
        tags: ["User"],
        summary: "사용자 목록 조회",
        description: "전체 사용자의 목록을 조회합니다.",
        responses: {
            "200": {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                result: {
                                    type: "boolean",
                                    example: "true"
                                },
                                users: {
                                    type: "object",
                                    example: [
                                        {
                                            id: 1,
                                            username: "sadariel",
                                            uuid: "639456c5-f7cb-4d8a-9f22-c6a23da27bc2"
                                        },
                                        {
                                            id: 2,
                                            username: "navylimes",
                                            uuid: "547c816f-39fe-4c21-a774-5e7710f766eb"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            "4xx": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                result: {
                                    type: "boolean",
                                    example: "false"
                                },
                                error: {
                                    type: "object",
                                    example: {
                                        errCode: -1,
                                        errMessage: "권한이 없습니다."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "post": {
        tags: ["User"],
        summary: "사용자 추가",
        description: "사용자를 추가합니다.",
        requestBody: {
            required: "true",
            content: {
                "application/x-www-form-urlencoded": {
                    schema: {
                        type: "object",
                        properties: {
                            "username": {
                                type: "string",
                                description: "사용자 이름"
                            },
                            "password": {
                                type: "string",
                                description: "사용자 비밀번호"
                            },
                            "email": {
                                type: "string",
                                description: "사용자 이메일"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                result: {
                                    type: "boolean",
                                    example: "true"
                                },
                                users: {
                                    type: "object",
                                    example: [
                                        {
                                            id: 1,
                                            username: "sadariel",
                                            uuid: "639456c5-f7cb-4d8a-9f22-c6a23da27bc2"
                                        },
                                        {
                                            id: 2,
                                            username: "navylimes",
                                            uuid: "547c816f-39fe-4c21-a774-5e7710f766eb"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            "4xx": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                result: {
                                    type: "boolean",
                                    example: "false"
                                },
                                error: {
                                    type: "object",
                                    example: {
                                        errCode: -1,
                                        errMessage: "권한이 없습니다."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};