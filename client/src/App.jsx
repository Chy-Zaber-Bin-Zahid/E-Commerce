import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./components/Cart Components/Cart";
import CartSlider from "./components/Cart Components/CartSlider";
import { useState } from "react";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";

function App() {
  const [cartSlider, setCartSlider] = useState(false);
  const [logged, setLogged] = useState(false);
  const [accountId, setAccountId] = useState("");

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
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route
            path="profile/:userId"
            element={<Profile setLogged={setLogged} logged={logged} />}
          />
          <Route
            path="/product/:userId"
            element={
              <ProductPage
                setLogged={setLogged}
                logged={logged}
                accountId={accountId}
              />
            }
          />
          <Route path="*" element={<PageNotFound logged={logged} />} />
        </Routes>
      </BrowserRouter>
      <Cart handelCartSlider={handelCartSlider} />
      <CartSlider handelCartSlider={handelCartSlider} cartSlider={cartSlider} />
    </div>
  );
}

export default App;
