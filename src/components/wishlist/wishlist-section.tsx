/**
 * wishlist-section.tsx - 찜 상품 메인 컴포넌트
 *
 * 이 컴포넌트는 다음을 담당합니다:
 * 1. 찜 목록 데이터 관리 (추가, 삭제)
 * 2. 자식 컴포넌트들 조합 (폼 + 목록)
 * 3. API 레이어를 통한 서버 데이터 통신
 *
 * 코드 구조:
 * - 기존: fetch()를 컴포넌트 내부에서 직접 호출 (서버 통신 로직이 컴포넌트에 섞임)
 * - 개선: src/api/wishlist.ts의 함수들을 import하여 사용
 * - 장점: 화면 표시 코드와 서버 통신 코드가 분리됨
 */

import { useState, useEffect } from "react";
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";
import { AddItemForm } from "./add-item-form";
import { WishlistDisplay } from "./wishlist-display";

/**
 * API 레이어에서 서버 통신 함수 import
 *
 * 웹 애플리케이션 계층 구조:
 * - 컴포넌트(이 파일): 화면 표시 및 사용자 상호작용 담당
 * - API 레이어(src/api/): 서버 통신 담당
 * - 서버: 데이터 저장 및 처리 담당
 *
 * 이렇게 역할을 분리하면:
 * - 컴포넌트는 서버 통신 방법을 몰라도 됨 (함수만 호출)
 * - 같은 API를 다른 컴포넌트에서도 재사용 가능
 * - 코드가 깔끔하고 테스트하기 쉬움
 */
import {
  fetchWishlist,
  addWishlistItem,
  deleteWishlistItem,
} from "@/api/wishlist";

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
   * 리팩토링 변화:
   * - 기존: fetch() 직접 호출 + JSON 파싱 + 에러 처리를 컴포넌트에서 모두 처리
   * - 개선: fetchWishlist() 함수 호출만으로 완료
   * - 이점: 서버 통신 로직을 API 레이어에 위임하여 컴포넌트 코드가 간결해짐
   */
  const fetchItems = async () => {
    try {
      console.log("서버에서 찜 목록을 불러오는 중...");

      /**
       * API 레이어 함수 호출
       *
       * fetchWishlist()는 다음을 자동으로 처리:
       * 1. HTTP GET 요청 생성 및 전송
       * 2. 서버 주소(Base URL) 자동 추가
       * 3. 서버 응답을 JavaScript 객체로 변환
       * 4. TypeScript 타입 안전성 보장
       *
       * 결과: 복잡한 통신 로직을 감추고 간단한 함수 호출로 사용 가능!
       */
      const data = await fetchWishlist();

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
   *
   * 리팩토링 변화:
   * - 기존: fetch() + HTTP 설정(method, headers) + JSON 변환을 컴포넌트에서 직접 처리
   * - 개선: addWishlistItem() 함수 호출만으로 완료
   * - 이점: HTTP 통신 복잡도를 API 레이어가 처리하여 코드가 간결해짐
   */
  const addItem = async (newItem: NewWishlistItem) => {
    try {
      if (isApiConnected) {
        console.log("서버에 새 상품을 추가하는 중...", newItem);

        /**
         * API 레이어 함수 호출
         *
         * addWishlistItem()는 다음을 자동으로 처리:
         * 1. HTTP POST 메서드 설정
         * 2. 요청 헤더(Content-Type: application/json) 추가
         * 3. JavaScript 객체를 JSON 문자열로 자동 변환
         * 4. 요청/응답 로깅 (디버깅용)
         *
         * 결과: 복잡한 HTTP 통신 코드(약 10줄)가 단 1줄로 간소화!
         */
        const createdItem = await addWishlistItem(newItem);

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
   *
   * 리팩토링 변화:
   * - 기존: fetch() + URL 조합 + DELETE 메서드 설정을 컴포넌트에서 직접 처리
   * - 개선: deleteWishlistItem(id) 함수 호출만으로 완료
   * - 이점: URL 조합 실수 방지, 코드 간결화
   */
  const deleteItem = async (id: string) => {
    try {
      if (isApiConnected) {
        console.log(`서버에서 상품(ID: ${id})을 삭제하는 중...`);

        /**
         * API 레이어 함수 호출
         *
         * deleteWishlistItem(id)는 다음을 자동으로 처리:
         * 1. HTTP DELETE 메서드 설정
         * 2. URL에 ID를 자동으로 조합 (예: /wishlist/123)
         * 3. 에러 발생 시 자동으로 감지하여 throw
         *
         * 결과: URL 조합 오류 방지, HTTP 통신 로직 숨김!
         */
        await deleteWishlistItem(id);

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
