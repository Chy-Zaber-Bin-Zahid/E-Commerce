import axios from "axios";
import { useEffect, useState } from "react";

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
        console.log(data[0].image);
      } catch (err) {
        console.log(err);
      }
    };

    handelFeatureProductFetch();
  }, []);

  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto">
      <div className="grid grid-cols-5 gap-4 w-full my-4">
        {featureProduct.length !== 0 ? (
          featureProduct.map((product) => (
            <div
              className="bg-white p-4 flex flex-col gap-4 rounded shadow-lg cursor-pointer hover:bg-yellow-50"
              key={product._id}
            >
              <img
                className="border-b-2 w-full"
                src={`http://localhost:3001/images/products/${product.image}`}
                alt={product.title}
              />
              <div className="flex flex-col justify-between flex-grow">
                <p>{product.title}</p>
                <b className="text-red-600">{product.price}Tk</b>
              </div>
            </div>
          ))
        ) : (
          <p>Hello Loading...</p>
        )}
      </div>
    </div>
  );
}

export default FeatureProduct;
