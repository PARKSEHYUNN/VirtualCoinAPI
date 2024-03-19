// /swagger/coin/coin_uuid.js

module.exports = {
    get: {
        tags: ["Coin"],
        summary: "특정 코인 조회",
        description: "특정 코인의 데이터를 조회합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "코인 UUID",
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
                                coin: {
                                    type: "object",
                                    example: {
                                        id: 1,
                                        name: "슬라임 코인",
                                        count: 5000,
                                        value: 1000,
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
        tags: ["Coin"],
        summary: "특정 코인 수정",
        description: "특정 코인의 데이터를 수정합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "코인 UUID",
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
                            "name": {
                                type: "string",
                                description: "코인 이름"
                            },
                            "count": {
                                type: "integer",
                                description: "코인 발급 개수"
                            },
                            "value": {
                                type: "integer",
                                description: "코인 가격"
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
                                coin: {
                                    type: "object",
                                    example: {
                                        id: 1,
                                        name: "슬라임 코인",
                                        count: 5000,
                                        value: 1000,
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
        tags: ["Coin"],
        summary: "특정 코인 삭제",
        description: "특정 코인의 데이터를 삭제합니다.",
        parameters: [
            {
                name: "uuid",
                in: "path",
                required: "true",
                description: "코인 UUID",
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