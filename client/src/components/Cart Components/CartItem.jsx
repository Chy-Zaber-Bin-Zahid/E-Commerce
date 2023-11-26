import axios from "axios";
import { useEffect, useState } from "react";

function CartItem({ accountId, cartSlider, logged, cartBounce }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handelCartItems = async () => {
      if (logged) {
        try {
          const result = await axios.get(
            `http://localhost:3001/api/user/cart/${accountId}`,
            {
              params: {
                fields: ["image", "title", "price"],
              },
            }
          );
          const data = result.data.payload.allCartItems;
          setCartItems(data);
          setIsLoading(false);
        } catch (err) {
          const errorMessage = err.response.data.error;
          if (errorMessage === "No items found in the cart") {
            console.log("Error in cart!");
          }
        }
      } else {
        setIsLoading(true);
      }
    };

    handelCartItems();
  }, [cartSlider, cartBounce, logged]);
  console.log(isLoading, logged);
  return (
    <div className="w-full h-full flex-1 overflow-y-auto">
      {isLoading && logged ? ( // Check if loading
        <h3 className="text-center py-6">Loading...</h3>
      ) : cartItems.length !== 0 && logged ? (
        cartItems.map((item, index) => (
          <div className="flex flex-col hover:bg-gray-100 " key={index}>
            <div className="flex gap-3  px-4 pt-4 ">
              <img
                className="w-12"
                src={`http://localhost:3001/images/products/${item.image}`}
                alt={item.title}
              />
              <h1 className="text-sm">{item.title}</h1>
              <img
                className="w-4 h-4 cursor-pointer mt-1"
                src="/images/delete.png"
                alt="Delete"
              />
            </div>
            <div className="flex justify-center items-center border-b pb-4">
              <h1 className="font-semibold">{`${item.price}Tk x ${item.total} = ${item.totalCost}Tk`}</h1>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center py-6">Your shopping cart is empty!</h3>
      )}
    </div>
  );
}

export default CartItem;
