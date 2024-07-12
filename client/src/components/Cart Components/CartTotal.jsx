import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartTotal({ logged, accountId, cartItems, handelCartSlider }) {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const handelCartTotal = async () => {
      if (logged) {
        try {
          const result = await axios.get(
            `https://smart-tech-ec8z.onrender.com/api/user/cart/total/${accountId}`,
            {
              params: {
                fields: ["costTotal"],
              },
            }
          );
          const data = result.data.payload.allCartItems;
          // Calculate the sum of 'costTotal'
          if (data.length !== 0) {
            let sum = 0;
            data.forEach((item) => {
              sum += Number(item.totalCost);
            });
            setTotalCost(sum);
          } else {
            setTotalCost(0);
          }
        } catch (err) {
          const errorMessage = err.response.data.error;
          if (errorMessage === "No items found in the cart") {
            console.log(errorMessage);
          }
        }
      } else {
        console.log("hello");
        setTotalCost(0);
      }
    };
    handelCartTotal();
  }, [cartItems, logged]);

  return (
    <div className="w-full flex-none bg-gray-100">
      <div className="p-4 flex justify-between items-center">
        <h1></h1>
        <h1 className="text-md text-gray-600">Total</h1>
        <h1 className="font-semibold">{logged ? `${totalCost}Tk` : "0Tk"}</h1>
      </div>
      {logged && totalCost !== 0 && (
        <Link
          to={`/payment/${accountId}`}
          onClick={handelCartSlider}
          className="p-3 w-full text-white bg-orange-600 hover:bg-orange-700 cursor-pointer  transition-all duration-300 flex justify-center items-center font-semibold"
        >
          Checkout
        </Link>
      )}
    </div>
  );
}

export default CartTotal;
