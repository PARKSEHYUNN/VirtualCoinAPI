// /errCode.js

module.exports = {
    "user": {
        "username": {
            "undefined": {
                errCode: 1,
                errMessage: "사용자 이름을 찾을 수 없습니다."
            },
            "syntax": {
                errCode: 2,
                errMessage: "사용자 이름은 영어와 숫자만 사용 가능합니다."
            },
            "overlap": {
                errCode: 7,
                errMessage: "이미 사용중인 사용자 이름 입니다."
            }
        },
        "password": {
            "undefined": {
                errCode: 3,
                errMessage: "사용자 비밀번호를 찾을 수 없습니다."
            },
            "syntax": {
                errCode: 4,
                errMessage: "사용자 비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다."
            }
        },
        "email": {
            "undefined": {
                errCode: 5,
                errMessage: "사용자 이메일을 찾을 수 없습니다."
            },
            "syntax": {
                errCode: 6,
                errMessage: "사용자 이메일 형식이 올바르지 않습니다."
            },
            "overlap": {
                errCode: 8,
                errMessage: "이미 사용중인 사용자 이메일 입니다."
            }
        }
    },
    "coin": {
        "name": {
            "undefined": {
                errCode: 1,
                errMessage: "코인 이름을 찾을 수 없습니다."
            },
            "overlap": {
                errCode: 6,
                errMessage: "이미 사용중인 코인 이름 입니다."
            }
        },
        "count": {
            "undefined": {
                errCode: 2,
                errMessage: "코인 발급 개수를 찾을 수 없습니다."
            },
            "syntax": {
                errCode: 3,
                errMessage: "코인 발급 개수는 숫자만 사용 가능합니다."
            }
        },
        "value": {
            "undefined": {
                errCode: 4,
                errMessage: "코인 가격을 찾을 수 없습니다."
            },
            "syntax": {
                errCode: 5,
                errMessage: "코인 가격은 숫자만 사용 가능합니다."
            }
        }
    }
}