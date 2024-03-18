// /swagger/user/get.js

module.exports = {
    get: {
        tags: ["User"],
        summary: "특정 사용자 조회",
        description: "특정 사용자의 데이터를 조회합니다.",
        parameters: [
            {
                name: "id",
                in: "path",
                required: "true",
                description: "사용자 id",
                schema: {
                    type: "integer"
                }
            }
        ],
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
                                    example: {
                                        id: 1,
                                        username: "sadariel",
                                        uuid: "639456c5-f7cb-4d8a-9f22-c6a23da27bc2"
                                    }
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