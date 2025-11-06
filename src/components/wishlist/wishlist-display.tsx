/**
 * wishlist-display.tsx - 찜 목록 표시 컴포넌트
 *
 * 찜한 상품들을 카드 형태로 화면에 표시합니다.
 * 각 상품마다 삭제 버튼과 구매 링크 버튼을 제공합니다.
 */

import { categoryLabels, type WishlistItem } from "@/types/wishlist";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
 */
export function WishlistDisplay({ items, onDelete }: WishlistDisplayProps) {
  /**
   * 삭제 버튼 클릭 시 실행되는 함수
   *
   * 사용자에게 확인 메시지를 보여주고,
   * 확인하면 부모 컴포넌트의 onDelete 함수를 호출합니다.
   */
  const handleDelete = (item: WishlistItem) => {
    if (window.confirm(`"${item.name}" 상품을 삭제하시겠습니까?`)) {
      onDelete(item.id);
    }
  };

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
   */
  return (
    <div className="space-y-4 w-full bg-white">
      <h2 className="text-2xl font-bold text-text">내 찜 목록</h2>

      {items.map((item) => (
        <Card
          key={item.id}
          className="w-full hover:translate-y-[-2px] transition-transform"
        >
          <CardContent className="pt-6">
            <div className="flex gap-4 items-start">
              {/* 상품 이미지 썸네일 (이미지가 있을 때만 표시) */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-base border-2 border-border"
                  onError={(e) => {
                    // 이미지 로드 실패 시 숨김 처리
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              {/* 상품 정보 영역 */}
              <div className="flex-1 min-w-0">
                {/* 카테고리 배지 */}
                <span className="inline-block px-2 py-1 text-xs rounded-base bg-secondary-background border border-border mb-2">
                  {categoryLabels[item.category]}
                </span>

                {/* 상품명 */}
                <CardTitle className="text-xl mb-2">{item.name}</CardTitle>

                {/* 가격 (toLocaleString: 숫자를 천 단위 콤마 형식으로 변환) */}
                <CardDescription className="text-lg font-semibold text-main mb-2">
                  {item.price.toLocaleString()}원
                </CardDescription>

                {/* 상품 설명 (있을 경우에만 표시) */}
                {item.description && (
                  <CardDescription className="mb-3 line-clamp-2">
                    {item.description}
                  </CardDescription>
                )}

                {/* 버튼 영역 */}
                <CardAction>
                  <div className="flex gap-2 flex-wrap">
                    {/* 구매 링크 버튼 (링크가 있을 경우에만 표시) */}
                    {item.link && (
                      <Button asChild size="sm" variant="default">
                        <a
                          href={item.link}
                          target="_blank" // 새 탭에서 열기
                          rel="noopener noreferrer" // 보안을 위한 설정
                        >
                          구매하기 🛒
                        </a>
                      </Button>
                    )}

                    {/* 삭제 버튼 */}
                    <Button
                      size="sm"
                      variant="neutral"
                      onClick={() => handleDelete(item)}
                    >
                      삭제 🗑️
                    </Button>
                  </div>
                </CardAction>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
