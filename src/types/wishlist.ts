/**
 * wishlist.ts - 찜 상품 관련 TypeScript 타입 정의
 *
 * TypeScript를 사용하면 데이터 구조를 미리 정의해서
 * 잘못된 데이터 사용을 방지할 수 있습니다.
 */

/**
 * 상품 카테고리 타입
 *
 * 5가지 카테고리 중 하나만 사용할 수 있도록 제한
 * 오타나 잘못된 값 입력을 방지합니다.
 */
export type Category =
  | "electronics" // 전자제품
  | "fashion" // 패션의류
  | "books" // 도서
  | "living" // 생활용품
  | "other"; // 기타

/**
 * 찜 상품 데이터 구조
 *
 * 각 상품이 가져야 할 정보를 정의합니다:
 * - id: 상품을 구분하는 고유 번호
 * - name: 상품명 (필수)
 * - price: 가격 (필수, 숫자)
 * - category: 카테고리 (필수, 위에서 정의한 5가지 중 하나)
 * - description?: 상품 설명 (선택, ?가 붙으면 선택 항목)
 * - link?: 구매 링크 (선택)
 * - image?: 이미지 URL (선택)
 */
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description?: string;
  link?: string;
  image?: string;
}

export type NewWishlistItem = Omit<WishlistItem, "id">;

export const categoryLabels: Record<Category, string> = {
  electronics: "전자제품",
  fashion: "패션의류",
  books: "도서",
  living: "생활용품",
  other: "기타",
};

/**
 * 카테고리 선택 옵션
 *
 * Select(드롭다운) 컴포넌트에서 사용할 선택지 목록
 */
export const categoryOptions: { value: Category; label: string }[] = [
  { value: "electronics", label: "전자제품" },
  { value: "fashion", label: "패션의류" },
  { value: "books", label: "도서" },
  { value: "living", label: "생활용품" },
  { value: "other", label: "기타" },
];
