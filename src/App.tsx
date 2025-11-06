/** 앱 엔트리 */

import RootLayout from "./components/layout/root-layout";
import { WishlistSection } from "./components/wishlist/wishlist-section";

const App = () => {
  return (
    <RootLayout>
      <WishlistSection />
    </RootLayout>
  );
};

export default App;
