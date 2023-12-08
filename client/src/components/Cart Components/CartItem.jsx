import axios from "axios";
import { useEffect, useState } from "react";

function CartItem({
  accountId,
  cartSlider,
  logged,
  cartBounce,
  setCartNumber,
  cartItems,
  setCartItems,
  payCheck
}) {
  const [isLoading, setIsLoading] = useState(true);
  console.log(payCheck);
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
  }, [cartSlider, cartBounce, logged, payCheck]);

  // cart item remove
  const handelItemDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:3001/api/user/cart/${id}`
      );
      const deletedItemId = result.data.payload.deletedItem._id;
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== deletedItemId
      );
      setCartItems(updatedCartItems);
      // setIsLoading(false);
    } catch (err) {
      const errorMessage = err.response.data.error;
      console.log(errorMessage);
    }
  };

  // cart number update
  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      for (const item of cartItems) {
        total += Number(item.total);
      }
      return total;
    };

    if (cartItems.length === 0) {
      setCartNumber(0);
    } else {
      const totalValue = calculateTotal();
      setCartNumber(totalValue);
    }
  }, [cartItems]);

  return (
    <div className="w-full h-full flex-1 overflow-y-auto">
      {isLoading && logged ? (
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
                onClick={() => handelItemDelete(item._id)}
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
