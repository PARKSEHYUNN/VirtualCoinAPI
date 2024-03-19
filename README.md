# VitrualCoinAPI

## API LIST
 * User
   * [x] {GET} /api/user - 전체 사용자 조회
   * [x] {GET} /api/user/{uuid} - 특정 사용자 조회
   * [x] {POST} /api/user - 사용자 추가
   * [x] {PATCH} /api/user/{uuid} - 특정 사용자 수정
   * [x] {DELETE} /api/user/{uuid} - 특정 사용자 삭제
 * Coin
   * [x] {GET} /api/coin - 전체 코인 조회
   * [x] {GET} /api/coin/{uuid} - 특정 코인 조회
   * [x] {POST} /api/coin - 코인 추가
   * [x] {PATCH} /api/coin/{uuid} - 특정 코인 수정
   * [x] {DELETE} /api/coin/{uuid} - 특정 코인 삭제
 * Wallet
   * [x] {GET} /api/wallet/{uuid} - 특정 사용자 지갑 조회
   * [x] {POST} /api/wallet/plus/coin/{uuid} - 특정 사용자 코인 증가
   * [x] {POST} /api/wallet/plus/money/{uuid} - 특정 사용자 돈 증가
   * [x] {POST} /api/wallet/minus/coin/{uuid} - 특정 사용자 코인 감소
   * [x] {POST} /api/wallet/minus/money/{uuid} - 특정 사용자 돈 감소

## Error
 * All
   * ErrCode -1
     * 권한이 없습니다.
   * ErrCode -2
     * 데이터베이스에 연결할 수 없습니다.
   * ErrCode 404
     * 페이지를 찾을 수 없습니다.

 * User
   * ErrCode 0
     * 사용자를 찾을 수 없습니다.
   * ErrCode 1
     * 사용자 이름을 찾을 수 없습니다.
   * ErrCode 2
     * 사용자 이름은 영어와 숫자만 사용 가능합니다.
   * ErrCode 3
     * 사용자 비밀번호를 찾을 수 없습니다.
   * ErrCode 4
     * 사용자 비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다.
   * ErrCode 5
     * 사용자 이메일을 찾을 수 없습니다.
   * ErrCode 6
     * 사용자 이메일 형식이 올바르지 않습니다.
   * ErrCode 7
     * 이미 사용중인 사용자 이름 입니다.
   * ErrCode 8
     * 이미 사용중인 사용자 이메일 입니다.

 * Coin
   * ErrCode 0
     * 코인을 찾을 수 없습니다.
   * ErrCode 1
     * 코인 이름을 찾을 수 없습니다.
   * ErrCode 2
     * 코인 발급 개수를 찾을 수 없습니다.
   * ErrCode 3
     * 코인 발급 개수는 숫자만 사용 가능합니다.
   * ErrCode 4
     * 코인 가격을 찾을 수 없습니다.
   * ErrCode 5
     * 코인 가격은 숫자만 사용 가능합니다.
   * ErrCode 6
     * 이미 사용중인 코인 이름 입니다.

 * Wallet
   * ErrCode 0
     * 지갑을 찾을 수 없습니다.
   * ErrCode 1
     * 코인 보유량이 음수일 수 없습니다.
   * ErrCode 2
     * 돈이 음수일 수 없습니다.