import type { PropsWithChildren } from "react";
import Nav from "./nav";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <Nav />
      <main className="py-8">{children}</main>
    </div>
  );
};

export default RootLayout;
