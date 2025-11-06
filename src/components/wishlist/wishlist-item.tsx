/** 찜 목록 아이템 카드 */

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

interface WishlistItemProps {
  item: WishlistItem;
  onDelete: (id: string) => void;
}

export function WishlistItem({ item, onDelete }: WishlistItemProps) {
  // --- 삭제 핸들러 ---
  const handleDelete = () => {
    if (window.confirm(`"${item.name}" 상품을 삭제하시겠습니까?`)) {
      onDelete(item.id);
    }
  };

  // --- 렌더 ---
  return (
    <Card className="w-full overflow-hidden py-0 bg-white">
      <div className="flex h-full flex-row items-center">
        <img
          src={item.image || "https://placehold.co/400x400?text=No+Image"}
          alt={item.name}
          className="aspect-4/3 w-52 object-cover shrink-0 rounded-l-base"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
        <CardContent className="flex-1 py-4 flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <Badge variant="neutral">{categoryLabels[item.category]}</Badge>
            <CardTitle className="text-base truncate">{item.name}</CardTitle>
            <CardDescription className="text-sm font-semibold text-main">
              {item.price.toLocaleString()}원
            </CardDescription>
          </div>
          <Button size="sm" variant="default" onClick={handleDelete}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
