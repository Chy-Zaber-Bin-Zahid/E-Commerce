import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dropdown({ search }) {
  const [dropdown, setDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [storeValue, setStoreValue] = useState("");
  const [productTotal, setProductTotal] = useState([]);

  const handleDropdown = (e) => {
    setStoreValue(e.target.value);
    if (e.target.value === "") {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  // Data fetch from feature collection
  useEffect(() => {
    const handleDropData = async (e) => {
      // e.preventDefault();
      try {
        const result = await axios.get(
          "http://localhost:3001/api/user/product",
          {
            params: {
              fields: ["image", "title", "price"],
            },
          }
        );
        const data = result.data.payload.allProduct;
        if (storeValue.length !== 0) {
          const productsWithInputInTitle = data.filter((product) =>
            product.title.includes(storeValue)
          );
          setProductTotal(productsWithInputInTitle);
          const productsFilter =
            productsWithInputInTitle.length >= 5
              ? productsWithInputInTitle.slice(0, 5)
              : productsWithInputInTitle;
          setInputValue(productsFilter);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleDropData();
  }, [storeValue]);

  return (
    <div className={`relative `}>
      <input
        className={`py-2 px-5 w-96 rounded focus:outline-none bg-white ${
          search && "w-full rounded-none py-4"
        }`}
        placeholder="Search"
        type="text"
        list="options"
        onChange={(e) => handleDropdown(e)}
      />
      <div
        className={`bg-white absolute w-96 ${
          search ? "w-full top-14" : "top-9"
        }  px-3 py-2 z-20 border-t ${dropdown === false ? "hidden" : "block"}`}
      >
        {inputValue.length !== 0 ? (
          inputValue.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className=" bg-slate-50 px-2 flex gap-2 py-2 hover:bg-slate-200"
            >
              <img
                className="border-b-2 w-16"
                src={`http://localhost:3001/images/products/${product.image}`}
                alt={product.title}
              />
              <div>
                <h1 className="text-sm">{product.title}</h1>
                <h1 className="text-orange-700 font-semibold">
                  {product.price}Tk
                </h1>
              </div>
            </Link>
          ))
        ) : !Array.isArray(inputValue) ? (
          <h1>Loading...</h1>
        ) : (
          <p>No product found!</p>
        )}
        {productTotal.length > 5 && (
          <Link
            to="/login"
            className="p-2 w-full text-orange-600 rounded hover:bg-orange-600 hover:text-white cursor-pointer  transition-all duration-300 flex justify-center items-center"
          >
            <p>See all results</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
