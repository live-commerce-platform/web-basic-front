/** 찜 목록 API */

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";

// --- 목록 조회 ---
export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await apiClient._____<WishlistItem[]>(
    ENDPOINTS.WISHLIST.LIST
  );
  return response.data;
};

// --- 추가 ---
export const addWishlistItem = async (
  newItem: NewWishlistItem
): Promise<WishlistItem> => {
  const response = await apiClient._____<WishlistItem>(
    ENDPOINTS.WISHLIST.ADD,
    newItem
  );
  return response.data;
};

// --- 삭제 ---
export const deleteWishlistItem = async (id: string): Promise<void> => {
  await apiClient._____(ENDPOINTS.WISHLIST.DELETE(id));
};
