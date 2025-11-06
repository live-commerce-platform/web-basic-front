/** 앱 엔트리 */

import RootLayout from "./components/layout/root-layout";
import { WishlistSection } from "./components/wishlist/wishlist-section";

const App = () => {
  // --- 레이아웃 조합 ---
  return (
    <RootLayout>
      <WishlistSection />
    </RootLayout>
  );
};

export default App;
