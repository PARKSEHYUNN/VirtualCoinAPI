// /swagger/coin/coin.js

module.exports = {
    get: {
        tags: ["Coin"],
        summary: "코인 목록 조회",
        description: "전체 코인의 목록을 조회합니다.",
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
                                coins: {
                                    type: "object",
                                    example: [
                                        {
                                            id: 1,
                                            name: "슬라임 코인",
                                            uuid: "639456c5-f7cb-4d8a-9f22-c6a23da27bc2"
                                        },
                                        {
                                            id: 2,
                                            name: "주황버섯 코인",
                                            uuid: "547c816f-39fe-4c21-a774-5e7710f766eb"
                                        },
                                        {
                                            id: 3,
                                            name: "예티 코인",
                                            uuid: "22fd88c6-6213-4636-95fa-432c686a50fd"
                                        },
                                        {
                                            id: 4,
                                            name: "발록 코인",
                                            uuid: "89e31926-23c8-4cdf-809e-9451af7caf8a"
                                        },
                                        {
                                            id: 5,
                                            name: "자쿰 코인",
                                            uuid: "71fb3905-2a3c-442f-8bd4-be7b96b2e9ff"
                                        },
                                        {
                                            id: 6,
                                            name: "핑크빈 코인",
                                            uuid: "559f5173-dcbb-40af-a247-8d981f071ef8"
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
        tags: ["Coin"],
        summary: "코인 추가",
        description: "코인을 추가합니다.",
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
                                description: "코인 발급 갯수"
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
    }
};