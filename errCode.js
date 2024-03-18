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
    }
}