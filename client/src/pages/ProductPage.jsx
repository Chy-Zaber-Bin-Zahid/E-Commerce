import ProductShowDetails from "../components/Product Components/ProductShowDetails";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import { useState } from "react";

function ProductPage({
  logged,
  setLogged,
  accountId,
  setCartNumber,
  handleCartBounce,
  setTotalCost
}) {
  const [wishListNotification, setWishListNotification] = useState(false);

  return (
    <div>
      <Navbar
        setLogged={setLogged}
        logged={logged}
        accountId={accountId}
        setCartNumber={setCartNumber}
        setTotalCost={setTotalCost}
      />
      <ProductShowDetails
        accountId={accountId}
        logged={logged}
        setWishListNotification={setWishListNotification}
        setCartNumber={setCartNumber}
        handleCartBounce={handleCartBounce}
      />
      <Notification
        wishListNotification={wishListNotification}
        setWishListNotification={setWishListNotification}
      />
      <Footer />
    </div>
  );
}

export default ProductPage;
