import { useState } from "react";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

function CartSlider({
  cartSlider,
  handelCartSlider,
  accountId,
  logged,
  cartBounce,
  setCartNumber,
  totalCost,
  setTotalCost,
  payCheck
}) {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div
      className={`${
        cartSlider === false ? "translate-x-full" : "translate-x-0"
      } w-96 fixed shadow-xl shadow-gray-500 top-0 h-screen right-0 bg-white duration-300 max-[500px]:w-full z-20`}
    >
      <div className="flex justify-between items-center bg-sky-950 px-4 py-3 ">
        <h1 className="text-white text-lg font-bold">Your Cart</h1>
        <h1
          onClick={handelCartSlider}
          className="text-white text-2xl font-bold cursor-pointer hover:text-sky-500 transition-all delay-100"
        >
          &times;
        </h1>
      </div>
      <div className="flex justify-center items-center flex-col  h-[calc(100vh-56px)]">
        <CartItem
          accountId={accountId}
          cartSlider={cartSlider}
          logged={logged}
          cartBounce={cartBounce}
          setCartNumber={setCartNumber}
          cartItems={cartItems}
          setCartItems={setCartItems}
          payCheck={payCheck}
        />
        <CartTotal
          logged={logged}
          accountId={accountId}
          cartItems={cartItems}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          handelCartSlider={handelCartSlider}
        />
      </div>
    </div>
  );
}

export default CartSlider;
