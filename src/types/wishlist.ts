/** 찜 상품 타입 정의 */

export type Category =
  | "electronics" // 전자제품
  | "fashion" // 패션의류
  | "books" // 도서
  | "living" // 생활용품
  | "other"; // 기타

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

export const categoryOptions: { value: Category; label: string }[] = [
  { value: "electronics", label: "전자제품" },
  { value: "fashion", label: "패션의류" },
  { value: "books", label: "도서" },
  { value: "living", label: "생활용품" },
  { value: "other", label: "기타" },
];
