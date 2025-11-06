/**
 * wishlist-section.tsx - 찜 상품 메인 컴포넌트
 *
 * 이 컴포넌트는 다음을 담당합니다:
 * 1. 찜 목록 데이터 관리 (추가, 삭제)
 * 2. 서버와의 API 통신 (데이터 불러오기, 저장하기)
 * 3. 자식 컴포넌트들 조합 (폼 + 목록)
 */

import { useState, useEffect } from "react";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";
import { AddItemForm } from "./add-item-form";
import { WishlistDisplay } from "./wishlist-display";

/**
 * API 서버 주소
 * 실제 프로젝트에서는 환경변수(.env 파일)로 관리하는 것이 좋습니다.
 */
const API_URL =
  "https://67f20da5-b90b-45ff-a0be-7595e83c0998.mock.pstmn.io/wishlist";

export function WishlistSection() {
  /**
   * useState: 컴포넌트의 상태(데이터) 관리
   *
   * items: 찜 목록 배열
   * setItems: items를 변경하는 함수
   *
   * state가 변경되면 컴포넌트가 자동으로 다시 렌더링됩니다.
   */
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isApiConnected, setIsApiConnected] = useState<boolean>(true);

  /**
   * useEffect: 컴포넌트의 생명주기 관리
   *
   * 컴포넌트가 화면에 처음 나타날 때 한 번만 실행됩니다.
   * 여기서는 초기 데이터를 불러오는 용도로 사용합니다.
   *
   * 의존성 배열 []:
   * - 빈 배열 = 컴포넌트 마운트 시 한 번만 실행
   * - 배열에 값이 있으면 그 값이 변경될 때마다 실행
   */
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

  /**
   * 서버에서 찜 목록 불러오기 (GET 요청)
   *
   * async/await: 비동기 작업을 동기 코드처럼 작성하는 문법
   * - 서버 응답을 기다렸다가 다음 코드를 실행합니다
   */
  const fetchItems = async () => {
    try {
      console.log("서버에서 찜 목록을 불러오는 중...");

      // fetch: 브라우저에 내장된 HTTP 통신 함수
      const response = await fetch(API_URL);

      // HTTP 응답 상태 확인 (200 OK인지 체크)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // JSON 데이터를 JavaScript 객체로 변환
      const data: WishlistItem[] = await response.json();

      // State 업데이트 → 화면 자동 갱신
      setItems(data);
      setIsApiConnected(true);

      console.log(`✅ 총 ${data.length}개의 상품을 불러왔습니다.`, data);
    } catch (error) {
      // API 연결 실패 시
      console.error("❌ API 연결 실패:", error);
      console.log("Demo 모드로 전환합니다. (로컬 메모리만 사용)");

      setIsApiConnected(false);
      setItems([]); // 빈 배열로 초기화
    }
  };

  /**
   * 서버에 새 상품 추가하기 (POST 요청)
   */
  const addItem = async (newItem: NewWishlistItem) => {
    try {
      if (isApiConnected) {
        console.log("서버에 새 상품을 추가하는 중...", newItem);

        // POST 요청 보내기
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 전송
          },
          body: JSON.stringify(newItem), // JavaScript 객체 → JSON 문자열
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 서버에서 생성된 아이템 (id 포함)
        const createdItem: WishlistItem = await response.json();

        /**
         * State 업데이트: 기존 배열에 새 아이템 추가
         *
         * 주의: 배열을 직접 수정하면 안 됩니다!
         * ❌ items.push(createdItem)  // 이렇게 하면 React가 변화를 감지 못함
         * ✅ setItems([...items, createdItem])  // 새 배열을 만들어서 전달
         *
         * [...items]는 기존 배열을 복사해서 새 배열을 만드는 문법입니다.
         */
        setItems([...items, createdItem]);

        console.log("✅ 상품이 추가되었습니다:", createdItem);
      } else {
        // Demo 모드: 로컬에서만 추가
        console.log("Demo 모드: 로컬에 상품 추가", newItem);

        // 임시 ID 생성 (실제로는 서버에서 만들어줌)
        const tempItem: WishlistItem = {
          ...newItem,
          id: `temp-${Date.now()}`, // 현재 시간을 ID로 사용
        };

        setItems([...items, tempItem]);

        console.log("✅ 로컬에 상품이 추가되었습니다:", tempItem);
      }
    } catch (error) {
      console.error("❌ 상품 추가 실패:", error);
      alert("상품 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 서버에서 상품 삭제하기 (DELETE 요청)
   */
  const deleteItem = async (id: string) => {
    try {
      if (isApiConnected) {
        console.log(`서버에서 상품(ID: ${id})을 삭제하는 중...`);

        // DELETE 요청
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`✅ 서버에서 상품(ID: ${id})이 삭제되었습니다.`);
      } else {
        console.log(`Demo 모드: 로컬에서 상품(ID: ${id}) 삭제`);
      }

      /**
       * State 업데이트: 해당 ID를 제외한 새 배열 생성
       *
       * filter(): 조건을 만족하는 요소만 남긴 새 배열을 반환
       * - item.id !== id : 삭제할 ID가 아닌 것들만 남김
       */
      setItems(items.filter((item) => item.id !== id));

      console.log(`✅ 로컬 State에서 상품(ID: ${id})이 제거되었습니다.`);
    } catch (error) {
      console.error("❌ 상품 삭제 실패:", error);
      alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 화면 렌더링
   *
   * 자식 컴포넌트들을 조합하여 완성된 UI를 만듭니다.
   * - AddItemForm: 상품 추가 폼
   * - WishlistDisplay: 찜 목록 표시
   *
   * Props 전달:
   * - 부모가 자식에게 데이터와 함수를 전달
   * - 데이터 흐름: 부모 → 자식 (단방향)
   */
  return (
    <div className="w-full space-y-8">
      {/* 반응형 레이아웃 */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* 왼쪽: 상품 추가 폼 */}
        <div className="w-full md:flex-1">
          {/*
            Props로 함수 전달:
            AddItemForm에서 폼을 제출하면 → addItem 함수가 실행됩니다
            이것이 자식 → 부모로 데이터를 전달하는 방법입니다.
          */}
          <AddItemForm onSubmit={addItem} />
        </div>

        {/* 오른쪽: 찜 목록 표시 */}
        <div className="w-full md:flex-2">
          {/*
            Props로 데이터와 함수 전달:
            - items: 표시할 상품 배열
            - onDelete: 삭제 버튼 클릭 시 호출할 함수
          */}
          <WishlistDisplay items={items} onDelete={deleteItem} />
        </div>
      </div>
    </div>
  );
}
