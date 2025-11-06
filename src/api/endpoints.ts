/**
 * API Endpoints Configuration (API 엔드포인트 설정 파일)
 *
 * 역할:
 * - 서버 API의 주소(URL)를 한 곳에서 관리하는 파일
 * - 개발 서버, 실제 서버 등 환경에 따라 다른 URL을 쉽게 전환할 수 있음
 *
 * 웹 개발 개념:
 * - 웹 애플리케이션은 브라우저(클라이언트)와 서버가 HTTP로 통신함
 * - 서버에 요청을 보낼 때마다 주소(URL)가 필요한데, 이를 한 곳에서 관리
 * - 예: https://example.com/api/users (서버 주소 + 경로)
 *
 * 왜 필요한가?
 * - 서버 주소가 변경되어도 이 파일 하나만 수정하면 됨
 * - 여러 파일에 같은 URL을 반복해서 쓰지 않아도 됨 (실수 방지)
 * - 개발/테스트/실제 서비스 환경별로 다른 서버 주소를 쉽게 설정 가능
 */

/**
 * API Base URL (API 서버의 기본 주소)
 *
 * 웹 통신의 구조:
 * - 브라우저(클라이언트)가 서버에 데이터를 요청할 때 사용하는 주소
 * - 현재는 테스트용 Mock API 서버를 사용 중
 * - 실제 서버로 바꿀 때는 이 주소만 변경하면 됨
 *
 * HTTP URL 구조:
 * - https://도메인주소/경로
 * - 예: https://example.com (기본 주소) + /wishlist (경로)
 *
 * 향후 개선 방향:
 * - 환경변수로 관리하면 개발/운영 서버를 자동으로 전환 가능
 * - 예시: export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
 */
export const API_BASE_URL =
  "https://2bf22259-0896-46cd-ab47-7e2acf3f5935.mock.pstmn.io";

/**
 * API Endpoints (API 경로 모음)
 *
 * REST API란?
 * - 웹에서 서버와 데이터를 주고받는 표준 방식
 * - URL 경로와 HTTP 메서드(GET, POST, DELETE 등)를 조합하여 사용
 *
 * HTTP 메서드:
 * - GET: 데이터 조회 (읽기)
 * - POST: 데이터 생성 (추가)
 * - PUT/PATCH: 데이터 수정
 * - DELETE: 데이터 삭제
 *
 * 경로 구조:
 * - /wishlist → 찜 목록 전체 관련 작업
 * - /wishlist/:id → 특정 ID의 찜 아이템 관련 작업
 */
export const ENDPOINTS = {
  // 찜 목록 관련 API 경로들
  WISHLIST: {
    LIST: "/items", // GET /items - 전체 목록 조회
    ADD: "/items", // POST /items - 새 아이템 추가
    DELETE: (id: string) => `/items/${id}`, // DELETE /items/:id - 특정 아이템 삭제
  },
} as const; // as const: TypeScript에서 읽기 전용 상수로 만듦 (실수로 수정 방지)

/**
 * 사용 예시:
 *
 * import { API_BASE_URL, ENDPOINTS } from '@/api/endpoints';
 *
 * // 전체 찜 목록 조회 URL 만들기
 * const listUrl = `${API_BASE_URL}${ENDPOINTS.WISHLIST.LIST}`;
 * // 결과: https://서버주소/wishlist
 *
 * // 특정 아이템 삭제 URL 만들기
 * const deleteUrl = `${API_BASE_URL}${ENDPOINTS.WISHLIST.DELETE('123')}`;
 * // 결과: https://서버주소/wishlist/123
 */
