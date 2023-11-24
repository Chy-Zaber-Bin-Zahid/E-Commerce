import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductShowDetails";

function ProductIncrement({ productDetails, logged, accountId }) {
  const [number, setNumber] = useState(1);
  const [cartLog, setCartLog] = useState(false);
  const { userId } = useParams();

  // Minus Plus product number
  const handleClick = (click) => {
    if (click === "minus" && number !== 1) {
      setNumber(number - 1);
    } else if (click === "plus") {
      setNumber(number + 1);
    }
  };

  //Add to cart
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (logged) {
      const { title, image, price } = productDetails;
      try {
        const result = await axios.post(
          `http://localhost:3001/api/user/cart/${userId}`,
          { title, image, price, number, accountId }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      setCartLog(true);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-50 flex mt-4 gap-5 mb-2">
        <div className="flex w-40">
          <button
            type="button"
            onClick={() => handleClick("minus")}
            className="border px-4 py-1 text-2xl font-semibold transition-all duration-300 hover:bg-gray-200"
          >
            &minus;
          </button>
          <input
            disabled
            value={number}
            type="text"
            className="border w-1/2 text-center font-semibold text-md border-l-0 border-r-0"
          />
          <button
            type="button"
            onClick={() => handleClick("plus")}
            className="border px-4 py-1 text-2xl font-semibold transition-all duration-300 hover:bg-gray-200"
          >
            +
          </button>
        </div>
        <button
          type="submit"
          className="bg-indigo-700 rounded  px-8 text-white font-semibold hover:bg-indigo-800 transition-all duration-300"
        >
          Add to cart
        </button>
      </form>
      {cartLog && (
        <p className="text-red-600 text-sm">
          You have to login first to add product into cart!
        </p>
      )}
    </>
  );
}

export default ProductIncrement;
