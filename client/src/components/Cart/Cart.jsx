function Cart({handelCartSlider}) {
  return (
    <div onClick={handelCartSlider} className="fixed bottom-5 right-5 bg-sky-950 p-4 rounded cursor-pointer transition-all delay-100 hover:bg-blue-800 flex justify-center items-center flex-col shadow-md shadow-gray-500">
      <div className="text-white px-2">
        <span class="material-symbols-outlined">shopping_basket</span>
      </div>
      <p className=" text-white">CART</p>

      <div className="absolute -top-2.5 -right-1.5">
        <p className="bg-red-600 inline-block py-1 px-2 rounded-full text-white">
          0
        </p>
      </div>
    </div>
  );
}

export default Cart;
