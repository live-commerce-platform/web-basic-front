/** 찜 상품 추가 폼 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryOptions,
  type Category,
  type NewWishlistItem,
} from "@/types/wishlist";
import { PlusIcon } from "lucide-react";
import { useState, type FormEvent } from "react";

interface AddItemFormProps {
  onSubmit: (item: NewWishlistItem) => void;
}

export function AddItemForm({ onSubmit }: AddItemFormProps) {
  // --- 상태 ---
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("electronics");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  // --- 제출 핸들러 ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert("상품명과 가격은 필수 입력 항목입니다.");
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }
    const newItem: NewWishlistItem = {
      name: name.trim(),
      price: priceNum,
      category,
      description: description.trim() || undefined,
      link: link.trim() || undefined,
      image: image.trim() || undefined,
    };
    onSubmit(newItem);
    setName("");
    setPrice("");
    setCategory("electronics");
    setDescription("");
    setLink("");
    setImage("");
  };

  // --- 렌더 ---
  return (
    <Card className="w-full bg-white">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              상품명 <span className="text-main">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="예: 무선 이어폰"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">
              가격 <span className="text-main">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="예: 50000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              카테고리 <span className="text-main">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as Category)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">상품 설명</Label>
            <Textarea
              id="description"
              placeholder="상품에 대한 간단한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">구매 링크</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://example.com/product"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">이미지 URL</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full font-bold">
            <PlusIcon className="w-4 h-4" />
            상품 추가하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
