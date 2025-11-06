/**
 * wishlist-item.tsx - 찜 목록 개별 아이템 컴포넌트
 *
 * 찜 목록의 개별 상품 카드를 렌더링합니다.
 * 이미지, 카테고리, 상품명, 가격, 삭제 버튼을 포함합니다.
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { categoryLabels, type WishlistItem } from "@/types/wishlist";
import { TrashIcon } from "lucide-react";
import { Badge } from "../ui/badge";

/**
 * Props 타입 정의
 *
 * item: 표시할 찜 상품 데이터
 * onDelete: 삭제 버튼 클릭 시 호출할 함수
 */
interface WishlistItemProps {
  item: WishlistItem;
  onDelete: (id: string) => void;
}

/**
 * WishlistItem 컴포넌트
 *
 * 개별 찜 상품을 가로형 카드로 표시합니다.
 *
 * 구조:
 * - 좌측: 정사각형 이미지 (또는 플레이스홀더)
 * - 중앙: 카테고리 배지 + 상품명 + 가격
 * - 우측: 삭제 버튼
 *
 * Web Concept:
 * - 컴포넌트 분리: 재사용 가능한 UI 단위로 분리
 * - Props: 부모로부터 데이터와 이벤트 핸들러를 받음
 * - 단일 책임: 이 컴포넌트는 "하나의 찜 상품을 표시"하는 역할만 수행
 */
export function WishlistItem({ item, onDelete }: WishlistItemProps) {
  /**
   * 삭제 버튼 클릭 핸들러
   *
   * 사용자에게 확인 메시지를 표시하고,
   * 확인하면 부모 컴포넌트의 onDelete 함수를 호출합니다.
   */
  const handleDelete = () => {
    if (window.confirm(`"${item.name}" 상품을 삭제하시겠습니까?`)) {
      onDelete(item.id);
    }
  };

  return (
    <Card className="w-full overflow-hidden py-0 bg-white">
      {/* flex 레이아웃: 이미지(좌측) + 콘텐츠(우측) - 균일한 높이 */}
      <div className="flex h-full flex-row items-center">
        {/* 좌측 이미지 영역 - 카드 전체 높이, 패딩 없음 */}
        <img
          src={item.image || "https://placehold.co/400x400?text=No+Image"}
          alt={item.name}
          className="aspect-4/3 w-52 object-cover shrink-0 rounded-l-base"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />

        {/* 우측 콘텐츠 영역 */}
        <CardContent className="flex-1 py-4 flex justify-between items-start gap-4">
          {/* 상품 정보 영역 */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* 카테고리 배지 */}
            <Badge variant="neutral">{categoryLabels[item.category]}</Badge>

            {/* 상품명 - 긴 텍스트는 한 줄로 말줄임 */}
            <CardTitle className="text-base truncate">{item.name}</CardTitle>

            {/* 가격 (toLocaleString: 숫자를 천 단위 콤마 형식으로 변환) */}
            <CardDescription className="text-sm font-semibold text-main">
              {item.price.toLocaleString()}원
            </CardDescription>
          </div>

          {/* 삭제 버튼 영역 */}
          <Button size="sm" variant="default" onClick={handleDelete}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
