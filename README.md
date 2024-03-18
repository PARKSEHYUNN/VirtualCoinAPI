# VitrualCoinAPI

## API LIST
 * User
   * [x] {GET} /api/user - 전체 사용자 조회
   * [x] {GET} /api/user/{id} - 특정 사용자 조회
   * [ ] {POST} /api/user - 사용자 추가
   * [ ] {PATCH} /api/user/{id} - 특정 사용자 수정
   * [ ] {DELETE} /api/user/{id} - 특정 사용자 삭제
 * Coin
   * [ ] {GET} /api/coin - 전체 코인 조회
   * [ ] {GET} /api/coin/{id} - 특정 코인 조회
   * [ ] {POST} /api/coin - 코인 추가
   * [ ] {PATCH} /api/coin/{id} - 특정 코인 수정
   * [ ] {DELETE} /api/coin/{id} - 특정 코인 삭제
 * Wallet
   * [ ] {GET} /api/wallet/{id} - 특정 사용자 지갑 조회
   * [ ] {POST} /api/wallet/buy/{id} - 특정 사용자 코인 구매
   * [ ] {POST} /api/wallet/sell/{id} - 특정 사용자 코인 판매

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