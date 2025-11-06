/**
 * Wishlist API Functions (찜 목록 API 함수 모음)
 *
 * 역할:
 * - 찜 목록 관련 서버 통신 함수들을 모아둔 파일
 * - 컴포넌트(화면 코드)에서는 이 함수들을 import해서 사용
 *
 * 코드 구조 개념:
 * - 웹 애플리케이션에서는 "화면 담당 코드"와 "서버 통신 담당 코드"를 분리함
 * - 이 파일은 서버 통신만 담당 (API Layer)
 * - 컴포넌트는 화면 표시만 담당 (UI Layer)
 *
 * 왜 분리하나?
 * - 컴포넌트가 서버 통신 방법을 몰라도 됨 (단순히 함수 호출만)
 * - 같은 API를 여러 컴포넌트에서 재사용 가능
 * - 서버 주소가 바뀌어도 이 파일만 수정하면 됨
 * - 테스트하기 쉽고, 코드가 깔끔해짐
 *
 * 사용 패턴:
 * - 모든 함수는 async/await 사용 (비동기 처리)
 * - 에러는 호출한 곳(컴포넌트)에서 처리하도록 throw
 * - TypeScript 타입으로 안전성 확보
 */

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";

/**
 * 찜 목록 전체 조회 (GET /items)
 *
 * 웹 개발 개념:
 * - HTTP GET 요청 = 서버에서 데이터를 읽어오는 요청
 * - 서버는 찜 목록 배열을 JSON 형식으로 응답
 *
 * @returns Promise<WishlistItem[]> - 찜 목록 배열 (비동기로 반환)
 * @throws AxiosError - 네트워크 오류, 서버 오류 등 발생 시 에러
 *
 * 사용 예시:
 * const items = await fetchWishlist();
 * // items = [{id: '1', name: '상품1', ...}, {id: '2', name: '상품2', ...}]
 */
export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  // HTTP GET 요청 보내기
  // apiClient.get()은 Promise를 반환 (비동기)
  // await로 서버 응답을 기다린 후 response 객체를 받음
  const response = await apiClient.get<WishlistItem[]>(ENDPOINTS.WISHLIST.LIST);

  // response.data: 서버가 보낸 실제 데이터
  // Axios는 HTTP 응답에서 데이터 부분만 추출해서 data 속성에 담아줌
  // 예: { status: 200, data: [...찜목록...], headers: {...} } → data만 반환
  return response.data;
};

/**
 * 새 찜 상품 추가 (POST /items)
 *
 * 웹 개발 개념:
 * - HTTP POST 요청 = 서버에 새 데이터를 생성하는 요청
 * - 클라이언트가 상품 정보를 JSON으로 보내면, 서버가 ID를 부여해서 저장
 *
 * @param newItem - 추가할 상품 정보 (id는 서버가 자동 생성)
 * @returns Promise<WishlistItem> - 서버가 생성한 상품 (id 포함)
 * @throws AxiosError - 네트워크 오류, 서버 오류 등 발생 시 에러
 *
 * 사용 예시:
 * const createdItem = await addWishlistItem({
 *   name: '아이폰',
 *   price: 1000000,
 *   category: 'electronics'
 * });
 * // createdItem = {id: '새로운ID', name: '아이폰', price: 1000000, ...}
 */
export const addWishlistItem = async (
  newItem: NewWishlistItem
): Promise<WishlistItem> => {
  // HTTP POST 요청 보내기
  // 첫 번째 인자: URL 경로 (어디로 보낼지)
  // 두 번째 인자: 요청 본문 데이터 (무엇을 보낼지)
  // Axios가 자동으로 JavaScript 객체 → JSON 문자열 변환
  const response = await apiClient.post<WishlistItem>(
    ENDPOINTS.WISHLIST.ADD,
    newItem
  );

  // 서버가 생성한 상품 정보 (id 포함) 반환
  return response.data;
};

/**
 * 찜 상품 삭제 (DELETE /items/:id)
 *
 * 웹 개발 개념:
 * - HTTP DELETE 요청 = 서버에서 데이터를 삭제하는 요청
 * - URL에 삭제할 상품의 ID를 포함하여 전송
 *   예: DELETE /items/123 → ID가 123인 상품 삭제
 *
 * @param id - 삭제할 상품의 ID
 * @returns Promise<void> - 삭제는 반환값이 없음 (성공하면 완료)
 * @throws AxiosError - 네트워크 오류, 서버 오류 등 발생 시 에러
 *
 * 사용 예시:
 * await deleteWishlistItem('123');
 * // 서버에서 ID가 '123'인 상품 삭제됨
 */
export const deleteWishlistItem = async (id: string): Promise<void> => {
  // HTTP DELETE 요청 보내기
  // URL에 삭제할 ID를 포함시켜 전송
  // ENDPOINTS.WISHLIST.DELETE(id)는 '/items/123' 형태의 경로를 생성
  await apiClient.delete(ENDPOINTS.WISHLIST.DELETE(id));

  // 레거시 규격: 삭제 성공 시 응답 본문이 없는 200 OK를 기본으로 사용
  // (서버 설정에 따라 204 No Content도 허용)
  // 에러가 발생하지 않으면 삭제 성공으로 간주하며 반환값은 없음 (void)
};

/**
 * API 함수 사용 시 주의사항
 *
 * 1. 에러 처리는 호출하는 곳에서 해야 함
 *    API 함수는 에러를 잡지 않고 그대로 던지므로 (throw)
 *    호출하는 곳에서 try-catch로 처리 필요
 *
 *    예시:
 *    try {
 *      const items = await fetchWishlist();
 *    } catch (error) {
 *      console.error('API 호출 실패:', error);
 *      alert('데이터를 불러오는데 실패했습니다.');
 *    }
 *
 * 2. async 함수 안에서만 await를 사용할 수 있음
 *    - React 컴포넌트의 useEffect 안에서 사용
 *    - 이벤트 핸들러 함수를 async로 선언하여 사용
 *
 *    예시:
 *    const handleLoad = async () => {
 *      const items = await fetchWishlist();
 *    };
 *
 * 3. TypeScript 타입이 자동으로 추론됨
 *    - fetchWishlist()의 반환값은 자동으로 WishlistItem[] 타입
 *    - IDE에서 자동완성과 타입 체크 지원
 *
 * 4. 비동기 프로그래밍 개념
 *    - 웹에서 서버 통신은 항상 비동기 (시간이 걸리기 때문)
 *    - Promise와 async/await을 사용하여 비동기 코드를 동기식처럼 작성
 *    - await을 만나면 서버 응답이 올 때까지 기다렸다가 다음 코드 실행
 */
