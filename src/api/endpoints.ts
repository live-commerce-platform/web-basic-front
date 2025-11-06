/** API 엔드포인트 설정 */

// --- 기본 주소 ---
// Postman Mock Server 주소 - 여기에 여러분의 Mock Server URL을 붙여넣으세요!
// 예: https://[YOUR-MOCK-ID].mock.pstmn.io/items
export const API_BASE_URL =
  "https://2bf22259-0896-46cd-ab47-7e2acf3f5935.mock.pstmn.io";

// --- 경로 모음 ---
export const ENDPOINTS = {
  // 찜 목록 관련 API 경로들
  WISHLIST: {
    LIST: "/items",
    ADD: "/items",
    DELETE: (id: string) => `/items/${id}`,
  },
} as const;
