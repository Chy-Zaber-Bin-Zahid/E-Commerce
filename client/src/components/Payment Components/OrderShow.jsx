import axios from "axios";
import { useEffect, useState } from "react";

function OrderShow({
  accountId,
  delivery,
  totalCost,
  setTotalCostCart,
}) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handelCartItems = async () => {
      try {
        const result = await axios.get(
          `https://smart-tech-ec8z.onrender.com/api/user/cart/${accountId}`,
          {
            params: {
              fields: ["title", "price", "total", "totalCost"],
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
          setTotalCostCart(sum);
        } else {
          setTotalCostCart(0);
        }
        setCartItems(data);
      } catch (err) {
        const errorMessage = err.response.data.error;
        if (errorMessage === "No items found in the cart") {
          console.log("Error in cart!");
        }
      }
    };

    handelCartItems();
  }, []);

  return (
    <div className="col-span-2 rounded border p-6 bg-white">
      <h1 className="font-semibold text-xl pb-4 border-b">
        <span className="px-3 py-1 bg-red-100 rounded-full text-red-500  text-lg mr-4">
          4
        </span>
        Order Overview
      </h1>
      <div className="h-56 overflow-y-auto">
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-slate-50 text-left font-normal text-gray-600">
                Product Name
              </th>
              <th className="px-4 py-2 bg-slate-50 text-left border-l-2 border-white font-normal text-gray-600">
                Price
              </th>
              <th className="px-4 py-2 bg-slate-50 text-right border-l-2 border-white font-normal text-gray-600">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-2 border-b text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr className="border-b" key={item._id}>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    {item.price}Tk x {item.total}
                  </td>
                  <td className="px-4 py-2 text-right">{item.totalCost}Tk</td>
                </tr>
              ))
            )}
            <tr className="border-b text-right font-semibold">
              <td colSpan="2" className="px-4 py-2">
                Sub total:
              </td>
              <td className="px-4 py-2 text-red-600">{totalCost}Tk</td>
            </tr>
            <tr className="border-b text-right font-semibold">
              <td colSpan="2" className="px-4 py-2">
                {delivery === "home" ? "Home Delivery:" : "Store Pickup:"}
              </td>
              <td className="px-4 py-2 text-red-600">
                {delivery === "home" ? "60Tk" : "0Tk"}
              </td>
            </tr>
            <tr className="border-b text-right font-semibold">
              <td colSpan="2" className="px-4 py-2">
                Total:
              </td>
              <td className="px-4 py-2 text-red-600">
                {delivery === "home" ? `${totalCost + 60}Tk` : `${totalCost}Tk`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderShow;
