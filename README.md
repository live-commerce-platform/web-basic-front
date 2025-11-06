<div align="center">

# Web Basic

웹 개발 기초 입문자를 위한 학습용 프로젝트입니다. 간단한 찜 목록(위시리스트)을 만들며 React/TypeScript/HTTP 통신의 기초를 익힙니다.

</div>

## 소개

- **목표**: React 기반으로 웹 개발 기초를 실습하며 학습합니다.

- **구성**: `src/api`(서버 통신), `src/components`(UI)로 역할을 분리합니다.

## 시작하기

사전 준비: Node.js LTS와 npm이 설치되어 있어야 합니다. 이 저장소는 npm을 기본으로 사용합니다(`package-lock.json` 존재).

```bash
npm install           # 의존성 설치
npm run dev           # 개발 서버 실행
npm run build         # 프로덕션 빌드
npm run preview       # 빌드 결과 미리보기
```

## 실습 문제 (빈칸 채우기 3문제)

아래 문제는 파일 위치와 목적을 확인하고, 빈칸을 채운 뒤 직접 실행해 정답을 검증합니다.

### 문제 1: 내 Mock 서버 기본 주소 채우기
- 목표: `API_BASE_URL`을 개인 Mock URL로 설정합니다.
- 파일: `src/api/endpoints.ts`

```ts
// 여기를 본인의 Mock Server 주소로 바꾸세요
export const API_BASE_URL = "https://[_____].mock.pstmn.io";
```

힌트: `[_____]`는 Postman이 발급한 Mock ID입니다.

### 문제 2: 목록 조회에서 axios 메서드 채우기
- 목표: 읽기(조회)에 맞는 axios 메서드 이름을 채웁니다.
- 파일: `src/api/wishlist.ts`
- 힌트: REST API에서 데이터를 가져오는(조회) 메서드는 무엇이었나요? (소문자)

```ts
import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type { WishlistItem } from "@/types/wishlist";

export const fetchWishlist = async (): Promise<WishlistItem[]> => {
  const response = await apiClient._____<WishlistItem[]>(
    ENDPOINTS.WISHLIST.LIST
  );
  return response.data;
};
```

### 문제 3: 추가/삭제에서 axios 메서드 채우기
- 목표: 생성/삭제 요청에 맞는 axios 메서드 이름을 채웁니다.
- 파일: `src/api/wishlist.ts`
- 힌트: REST API에서 데이터를 생성/삭제하는 메서드는 무엇이었나요? (소문자)

```ts
import type { WishlistItem, NewWishlistItem } from "@/types/wishlist";

export const addWishlistItem = async (
  newItem: NewWishlistItem
): Promise<WishlistItem> => {
  const response = await apiClient._____<WishlistItem>(
    ENDPOINTS.WISHLIST.ADD,
    newItem
  );
  return response.data;
};

export const deleteWishlistItem = async (id: string): Promise<void> => {
  await apiClient._____(ENDPOINTS.WISHLIST.DELETE(id));
};
```


## 테스트 방법

0) 프로젝트에 필요한 의존성 설치: `npm install`
1) 개발 서버 실행: `npm run dev`
2) 브라우저에서 `http://localhost:5173`로 접속하여 테스트합니다.
   1) 개발 서버를 열면 터미널에도 주소가 출력됩니다.
3) 조회, 생성, 삭제 요청을 테스트합니다.

## 개발자 도구 활용하기
- 브라우저에서 f12를 누르면 개발자 도구가 열립니다.
- API 요청이나 성공, 실패 등에 대한 데이터 로그가 console 탭에 출력됩니다.
- 해당 로그를 보고 성공과 실패 여부를 확인하세요!

## 체크리스트

- [ ] 개발 서버가 정상 실행된다
- [ ] 목록 조회 요청이 성공한다
- [ ] 상품 추가/삭제 요청이 정상 동작한다
- [ ] 문제 1~3을 완료하고 console 탭에서 성공 로그를 확인했다

## 라이선스

이 프로젝트는 `LICENSE` 파일의 내용을 따릅니다.
