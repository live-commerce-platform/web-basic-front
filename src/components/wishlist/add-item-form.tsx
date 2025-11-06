/**
 * add-item-form.tsx - 찜 상품 추가 폼 컴포넌트
 *
 * 새로운 찜 상품을 추가하기 위한 입력 폼을 제공합니다.
 * 사용자가 입력한 데이터를 부모 컴포넌트로 전달합니다.
 */

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

/**
 * AddItemForm 컴포넌트
 *
 * Controlled Component 패턴:
 * React가 모든 입력 필드의 값을 직접 관리합니다.
 * 사용자가 입력하면 → state 업데이트 → 화면에 반영
 */
export function AddItemForm({ onSubmit }: AddItemFormProps) {
  /**
   * useState: React의 상태 관리
   *
   * const [현재값, 값을변경하는함수] = useState(초기값)
   *
   * 각 입력 필드마다 하나씩 state를 만들어서 관리합니다.
   * state가 변경되면 화면이 자동으로 다시 그려집니다.
   */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("electronics");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  /**
   * 폼 제출 처리 함수
   *
   * 사용자가 "상품 추가하기" 버튼을 클릭하면 실행됩니다.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 페이지 새로고침 방지 (기본 폼 동작 막기)
    e.preventDefault();

    // 필수 입력 검증
    if (!name.trim() || !price) {
      alert("상품명과 가격은 필수 입력 항목입니다.");
      return;
    }

    // 가격 유효성 검증
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }

    // 새 상품 데이터 생성
    const newItem: NewWishlistItem = {
      name: name.trim(),
      price: priceNum,
      category,
      description: description.trim() || undefined,
      link: link.trim() || undefined,
      image: image.trim() || undefined,
    };

    // 부모 컴포넌트의 onSubmit 함수 호출
    onSubmit(newItem);

    // 폼 초기화 (입력 필드 비우기)
    setName("");
    setPrice("");
    setCategory("electronics");
    setDescription("");
    setLink("");
    setImage("");
  };

  return (
    <Card className="w-full bg-white">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 상품명 입력 */}
          <div className="space-y-2">
            <Label htmlFor="name">
              상품명 <span className="text-main">*</span>
            </Label>
            {/*
              Controlled Input:
              - value={name}: state 값을 input에 연결
              - onChange: 사용자가 입력할 때마다 state 업데이트

              이렇게 하면 React가 입력값을 완전히 제어할 수 있습니다.
            */}
            <Input
              id="name"
              type="text"
              placeholder="예: 무선 이어폰"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 가격 입력 */}
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

          {/* 카테고리 선택 */}
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
                {/* map()으로 각 옵션을 하나씩 순회하며 SelectItem 생성 */}
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 상품 설명 입력 */}
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

          {/* 구매 링크 입력 */}
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

          {/* 이미지 URL 입력 */}
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

          {/* 제출 버튼 */}
          <Button type="submit" className="w-full font-bold">
            <PlusIcon className="w-4 h-4" />
            상품 추가하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
