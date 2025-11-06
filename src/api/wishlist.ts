/** 찜 목록 API 함수 모음 (간단 버전) */

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";

/**
 * 찜 목록 전체 조회
 * @returns 찜 목록 배열
 */
export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await apiClient.get<WishlistItem[]>(ENDPOINTS.WISHLIST.LIST);
  return response.data;
};

/**
 * 새 찜 상품 추가
 * @param newItem 추가할 상품 정보(id 제외)
 * @returns 생성된 상품
 */
export const addWishlistItem = async (
  newItem: NewWishlistItem
): Promise<WishlistItem> => {
  const response = await apiClient.post<WishlistItem>(
    ENDPOINTS.WISHLIST.ADD,
    newItem
  );
  return response.data;
};

/**
 * 찜 상품 삭제
 * @param id 삭제할 상품 ID
 */
export const deleteWishlistItem = async (id: string): Promise<void> => {
  await apiClient.delete(ENDPOINTS.WISHLIST.DELETE(id));
};
