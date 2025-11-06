import { Card, CardContent } from "../ui/card";

const Nav = () => {
  return (
    <nav>
      <Card className="bg-white">
        <CardContent>
          <h2 className="text-3xl">My Wishlist</h2>
        </CardContent>
      </Card>
    </nav>
  );
};

export default Nav;
