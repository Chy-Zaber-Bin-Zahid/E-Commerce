import axios from "axios";
import { useEffect, useState } from "react";

function CartItem({ accountId, cartSlider, logged }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

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
          console.log(data);
          if (data.length === 0) {
            setCartEmpty(true);
            console.log("object");
          } else {
            setCartItems(data);
            setCartEmpty(false);
          }
        } catch (err) {
          const errorMessage = err.response.data.error;
          if (errorMessage === "No items found in the cart") {
            console.log("Error in cart!");
          }
        }
      }
    };
    
    handelCartItems();
  }, [cartSlider]);

  return (
    <div className="w-full h-full flex-1">
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <>
            <div>h1</div>
          </>
        ))
      ) : cartEmpty ? (
        <h3 className="text-center py-6">Loading...</h3>
      ) : (
        <h3 className="text-center py-6">Your shopping cart is empty!</h3>
      )}
    </div>
  );
}

export default CartItem;
