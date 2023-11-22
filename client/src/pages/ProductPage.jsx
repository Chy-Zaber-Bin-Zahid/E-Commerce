import ProductDetails from "../components/Product Components/ProductDetails";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import { useState } from "react";

function ProductPage({ logged, setLogged, accountId }) {
  const [wishListNotification, setWishListNotification] = useState(false);

  return (
    <div>
      <Navbar setLogged={setLogged} logged={logged} accountId={accountId} />
      <ProductDetails accountId={accountId} setWishListNotification={setWishListNotification}/>
      <Notification wishListNotification={wishListNotification} setWishListNotification={setWishListNotification} />
      <Footer />
    </div>
  );
}

export default ProductPage;
