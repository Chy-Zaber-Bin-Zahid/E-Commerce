import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./components/Cart Components/Cart";
import CartSlider from "./components/Cart Components/CartSlider";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import Payment from "./pages/Payment";

function App() {
  const [cartSlider, setCartSlider] = useState(false);
  const [logged, setLogged] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [cartNumber, setCartNumber] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);
  const [payCheck, setPayCheck] = useState(false);
  const [adminCheck, setAdminCheck] = useState(false);
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (!logged) {
      setAccountId("");
    }
    console.log(accountId);
  }, [logged]);

  const handleCartBounce = () => {
    setCartBounce(true);
    setTimeout(() => {
      setCartBounce(false);
    }, 2500);
  };

  const handelCartSlider = () => {
    setCartSlider(!cartSlider);
  };

  return (
    <div className="relative h-screen ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                setLogged={setLogged}
                logged={logged}
                accountId={accountId}
                setAccountId={setAccountId}
                setCartNumber={setCartNumber}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                setLogged={setLogged}
                logged={logged}
                setAccountId={setAccountId}
                setAdminCheck={setAdminCheck}
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route
            path="profile/:userId"
            element={
              <Profile
                setLogged={setLogged}
                logged={logged}
                setCartNumber={setCartNumber}
                adminCheck={adminCheck}
                setPayment={setPayment}
                payment={payment}
              />
            }
          />
          <Route
            path="/product/:userId"
            element={
              <ProductPage
                setLogged={setLogged}
                logged={logged}
                accountId={accountId}
                setCartNumber={setCartNumber}
                handleCartBounce={handleCartBounce}
              />
            }
          />
          <Route
            path="/payment/:userId"
            element={
              <Payment
                setLogged={setLogged}
                logged={logged}
                accountId={accountId}
                setAccountId={setAccountId}
                setCartNumber={setCartNumber}
                setPayCheck={setPayCheck}
                payCheck={payCheck}
                payment={payment}
                setPayment={setPayment}
              />
            }
          />
          <Route path="*" element={<PageNotFound logged={logged} />} />
        </Routes>
        <Cart
          handelCartSlider={handelCartSlider}
          cartNumber={cartNumber}
          cartBounce={cartBounce}
        />
        <CartSlider
          handelCartSlider={handelCartSlider}
          cartSlider={cartSlider}
          accountId={accountId}
          logged={logged}
          cartBounce={cartBounce}
          setCartNumber={setCartNumber}
          payCheck={payCheck}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
