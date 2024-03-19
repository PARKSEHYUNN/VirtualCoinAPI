// /swagger/wallet/wallet_uuid.js

module.exports = {
    get: {
        tags: ["Wallet"],
        summary: "특정 사용자 지갑 조회",
        description: "특정 사용자의 지갑 데이터를 조회합니다.",
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
                                        money: 10000,
                                        coins: [
                                            {
                                                name: "슬라임 코인",
                                                count: 5,
                                                value: 25000,
                                                uuid: "639456c5-f7cb-4d8a-9f22-c6a23da27bc2"
                                            },
                                            {
                                                name: "핑크빈 코인",
                                                count: 1,
                                                value: 100000,
                                                uuid: "559f5173-dcbb-40af-a247-8d981f071ef8"
                                            }
                                        ],
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