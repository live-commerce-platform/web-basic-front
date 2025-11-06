/**
 * App.tsx - 애플리케이션 최상위 컴포넌트
 *
 * 전체 앱의 레이아웃과 주요 컴포넌트들을 조합합니다.
 */

import RootLayout from "./components/layout/root-layout";
import { WishlistSection } from "./components/wishlist/wishlist-section";

/**
 * App 컴포넌트
 *
 * 다른 컴포넌트들을 조합하여 완성된 앱을 만듭니다.
 */
const App = () => {
  return (
    <RootLayout>
      <WishlistSection />
    </RootLayout>
  );
};

export default App;
