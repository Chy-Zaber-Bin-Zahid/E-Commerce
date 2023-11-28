function Cart({ handelCartSlider, cartNumber, cartBounce }) {
  return (
    <div
      onClick={handelCartSlider}
      className={`fixed bottom-5 right-5 bg-sky-950 p-4 rounded cursor-pointer transition-all delay-100 hover:bg-blue-800 flex justify-center items-center flex-col shadow-md shadow-gray-600 max-[600px]:p-2 ${
        cartBounce && "animate-bounce"
      }`}
    >
      <div className="text-white px-2 max-[600px]:text-sm">
        <span class="material-symbols-outlined">shopping_basket</span>
      </div>
      <p className=" text-white max-[600px]:text-sm">CART</p>

      <div className="absolute -top-2.5 -right-1.5">
        <p className="bg-red-600 inline-block py-1 px-2 rounded-full text-white max-[600px]:text-xs">
          {cartNumber}
        </p>
      </div>
    </div>
  );
}

export default Cart;
