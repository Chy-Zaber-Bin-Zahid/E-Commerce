import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./components/Cart Components/Cart";
import CartSlider from "./components/Cart Components/CartSlider";
import { useState } from "react";

function App() {
  const [cartSlider, setCartSlider] = useState(false);

  const handelCartSlider = () => {
    setCartSlider(!cartSlider);
  };

  return (
    <div className="relative h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Cart handelCartSlider={handelCartSlider} />
      <CartSlider handelCartSlider={handelCartSlider} cartSlider={cartSlider} />
    </div>
  );
}

export default App;
