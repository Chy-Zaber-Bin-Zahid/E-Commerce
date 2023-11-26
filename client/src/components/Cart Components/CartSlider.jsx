import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

function CartSlider({
  cartSlider,
  handelCartSlider,
  accountId,
  logged,
  cartBounce,
}) {
  return (
    <div
      className={`${
        cartSlider === false
          ? "w-0 max-[500px]:w-0 overflow-x-hidden overflow-y-hidden"
          : "w-96  overflow-x-hidden overflow-y-hidden"
      } fixed shadow-xl shadow-gray-500 top-0 h-screen right-0 bg-white duration-300 max-[500px]:w-full z-20`}
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
        />
        <CartTotal />
      </div>
    </div>
  );
}

export default CartSlider;
