/** 찜 목록 섹션 */

import { useState, useEffect } from "react";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";
import { AddItemForm } from "./add-item-form";
import { WishlistDisplay } from "./wishlist-display";

import {
  fetchWishlist,
  addWishlistItem,
  deleteWishlistItem,
} from "@/api/wishlist";

export function WishlistSection() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(true);

  useEffect(() => {
    console.log(
      "WishlistSection 컴포넌트가 마운트되었습니다. 초기 데이터를 불러옵니다."
    );
    fetchItems(); // 초기 데이터 로딩

    // Cleanup 함수: 컴포넌트가 사라질 때 실행
    return () => {
      console.log("WishlistSection 컴포넌트가 언마운트됩니다.");
    };
  }, []);

  const fetchItems = async () => {
    try {
      console.log("서버에서 찜 목록을 불러오는 중...");

      const data = await fetchWishlist();

      setItems(data);
      setIsApiConnected(true);

      console.log(`✅ 총 ${data.length}개의 상품을 불러왔습니다.`, data);
    } catch (error) {
      console.error("❌ API 연결 실패:", error);
      console.log("Demo 모드로 전환합니다. (로컬 메모리만 사용)");

      setIsApiConnected(false);
      setItems([]);
    }
  };

  const addItem = async (newItem: NewWishlistItem) => {
    try {
      if (isApiConnected) {
        console.log("서버에 새 상품을 추가하는 중...", newItem);

        const createdItem = await addWishlistItem(newItem);
        setItems([...items, createdItem]);

        console.log("✅ 상품이 추가되었습니다:", createdItem);
      } else {
        // Demo 모드: 로컬에서만 추가
        console.log("Demo 모드: 로컬에 상품 추가", newItem);

        const tempItem: WishlistItem = {
          ...newItem,
          id: `temp-${Date.now()}`,
        };

        setItems([...items, tempItem]);

        console.log("✅ 로컬에 상품이 추가되었습니다:", tempItem);
      }
    } catch (error) {
      console.error("❌ 상품 추가 실패:", error);
      alert("상품 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      if (isApiConnected) {
        console.log(`서버에서 상품(ID: ${id})을 삭제하는 중...`);

        await deleteWishlistItem(id);

        console.log(`✅ 서버에서 상품(ID: ${id})이 삭제되었습니다.`);
      } else {
        console.log(`Demo 모드: 로컬에서 상품(ID: ${id}) 삭제`);
      }

      setItems(items.filter((item) => item.id !== id));

      console.log(`✅ 로컬 State에서 상품(ID: ${id})이 제거되었습니다.`);
    } catch (error) {
      console.error("❌ 상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:flex-1">
          <AddItemForm onSubmit={addItem} />
        </div>
        <div className="w-full md:flex-2">
          <WishlistDisplay items={items} onDelete={deleteItem} />
        </div>
      </div>
    </div>
  );
}
