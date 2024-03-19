// /swagger/user/user_uuid.js

module.exports = {
    get: {
        tags: ["User"],
        summary: "특정 사용자 조회",
        description: "특정 사용자의 데이터를 조회합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "사용자 UUID",
                schema: {
                    type: "string"
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
                                user: {
                                    type: "object",
                                    example: {
                                        id: 1,
                                        username: "sadariel",
                                        password_key: "Pn9Jq7K58jC98dG/+fmmP8hlVi5Wbz+DKTpyuVVmEY7LnrhYoV5QSCI6gg6jy5VUBDT3E+F6ug3Xf0NeyAZXQw==",
                                        password_salt: "Sq2aX2UPeAwqdGYZgvW/sibT+2sRoIUPTIAcuJ7eXpjIIyRL7tOmM8FKAhKhakoEGyR9k3w6URGU+QH7gXA1fw==",
                                        email: "sadariel3@gmail.com",
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
    },
    patch: {
        tags: ["User"],
        summary: "특정 사용자 수정",
        description: "특정 사용자의 데이터를 수정합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "사용자 UUID",
                schema: {
                    type: "string"
                }
            }
        ],
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
                                user: {
                                    type: "object",
                                    example: {
                                        id: 1,
                                        username: "sadariel",
                                        password_key: "Pn9Jq7K58jC98dG/+fmmP8hlVi5Wbz+DKTpyuVVmEY7LnrhYoV5QSCI6gg6jy5VUBDT3E+F6ug3Xf0NeyAZXQw==",
                                        password_salt: "Sq2aX2UPeAwqdGYZgvW/sibT+2sRoIUPTIAcuJ7eXpjIIyRL7tOmM8FKAhKhakoEGyR9k3w6URGU+QH7gXA1fw==",
                                        email: "sadariel3@gmail.com",
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
    },
    delete: {
        tags: ["User"],
        summary: "특정 사용자 삭제",
        description: "특정 사용자의 데이터를 삭제합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "사용자 UUID",
                schema: {
                    type: "string"
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