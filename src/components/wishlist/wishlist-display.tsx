/**
 * wishlist-display.tsx - 찜 목록 표시 컴포넌트
 *
 * 찜한 상품들을 카드 형태로 화면에 표시합니다.
 * 각 상품마다 삭제 버튼을 제공합니다.
 */

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type WishlistItem } from "@/types/wishlist";
import { WishlistItem as WishlistItemCard } from "./wishlist-item";

/**
 * Props 타입 정의
 *
 * items: 표시할 찜 상품 배열
 * onDelete: 상품을 삭제할 때 호출할 함수
 */
interface WishlistDisplayProps {
  items: WishlistItem[];
  onDelete: (id: string) => void;
}

/**
 * WishlistDisplay 컴포넌트
 *
 * Props로 받은 데이터를 화면에 표시합니다.
 * Props는 부모 컴포넌트에서 전달받은 읽기 전용 데이터입니다.
 *
 * Web Concept - 컴포넌트 분리:
 * - 이 컴포넌트는 "목록 전체를 관리"하는 역할
 * - 개별 아이템 렌더링은 WishlistItem 컴포넌트에 위임
 * - 이렇게 하면 각 컴포넌트가 하나의 책임만 가짐 (Single Responsibility)
 */
export function WishlistDisplay({ items, onDelete }: WishlistDisplayProps) {
  // 찜 목록이 비어있을 때 안내 메시지 표시
  if (items.length === 0) {
    return (
      <Card className="w-full bg-white">
        <CardContent>
          <p className="text-center text-text text-lg">
            아직 찜한 상품이 없어요! 🎁
          </p>
          <p className="text-center text-text/60 text-sm mt-2">
            폼에서 상품을 추가해보세요!
          </p>
        </CardContent>
      </Card>
    );
  }

  /**
   * 찜 목록 렌더링
   *
   * map(): 배열의 각 요소를 순회하며 UI를 생성합니다
   * key: React가 각 아이템을 구분하기 위한 고유 식별자 (필수!)
   *
   * 구조:
   * - 외부 카드: 전체 찜 목록을 감싸는 컨테이너
   * - WishlistItemCard: 개별 상품 아이템 (별도 컴포넌트)
   *
   * Web Concept - 컴포넌트 재사용:
   * - WishlistItemCard 컴포넌트를 map으로 반복 생성
   * - 각 아이템에 item 데이터와 onDelete 함수를 전달
   * - 이렇게 하면 아이템 렌더링 로직을 재사용 가능
   */
  return (
    <Card className="w-full bg-white">
      <CardContent>
        {/* 헤더 영역: 제목과 상품 개수 */}
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl">내 찜 목록</CardTitle>
          <span className="text-sm text-text/60">{items.length}개</span>
        </div>

        {/* 상품 목록 영역 */}
        <div className="space-y-4">
          {items.map((item) => (
            <WishlistItemCard key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
