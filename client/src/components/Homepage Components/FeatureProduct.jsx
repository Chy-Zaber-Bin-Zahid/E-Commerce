import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeatureProduct() {
  const [featureProduct, setFeatureProduct] = useState([]);

  useEffect(() => {
    const handelFeatureProductFetch = async () => {
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
        setFeatureProduct(data);
      } catch (err) {
        console.log(err);
      }
    };

    handelFeatureProductFetch();
  }, []);

  return (
    <>
      {featureProduct.length !== 0 ? (
        <div className="flex justify-between items-center max-w-screen-xl mx-auto max-[1320px]:w-11/12">
          <div className="grid grid-cols-5 gap-4 w-full my-4 max-[1045px]:grid-cols-4 max-[910px]:grid-cols-3 max-[650px]:grid-cols-2 max-[500px]:grid-cols-1">
            {featureProduct.length !== 0 &&
              featureProduct.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="bg-white p-4 flex flex-col gap-4 rounded shadow-lg cursor-pointer hover:bg-slate-100"
                  key={product._id}
                >
                  <img
                    className="border-b-2 w-full"
                    src={`http://localhost:3001/images/products/${product.image}`}
                    alt={product.title}
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="max-[1200px]:text-sm max-[500px]:text-base">
                      {product.title}
                    </p>
                    <b className="text-red-600 max-[500px]:text-lg">
                      {product.price}Tk
                    </b>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center w-full p-36">Loading...</p>
      )}
    </>
  );
}

export default FeatureProduct;
