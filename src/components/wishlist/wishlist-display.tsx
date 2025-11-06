/** 찜 목록 표시 */

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type WishlistItem } from "@/types/wishlist";
import { WishlistItem as WishlistItemCard } from "./wishlist-item";

interface WishlistDisplayProps {
  items: WishlistItem[];
  onDelete: (id: string) => void;
}

export function WishlistDisplay({ items, onDelete }: WishlistDisplayProps) {
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
  return (
    <Card className="w-full bg-white">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl">내 찜 목록</CardTitle>
          <span className="text-sm text-text/60">{items.length}개</span>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <WishlistItemCard key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
