import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { userId } = useParams();
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const handelFeatureProductFetch = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/user/product/${userId}`,
          {
            params: {
              fields: ["image", "title", "price", "keyFeature"],
            },
          }
        );
        const data = result.data.payload.product;
        setProductDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    handelFeatureProductFetch();
  }, [userId]);

  return (
    <div className="grid grid-cols-2 py-8">
      {productDetails.length === 0 ? (
        <h1 className="text-2xl text-center w-full p-36 col-span-full">
          Loading...
        </h1>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:3001/images/products/${productDetails.image}`}
              alt={productDetails.title}
              className="w-96"
            />
          </div>
          <div>
            <div className="pb-6 flex flex-col gap-2">
              <h1 className="text-2xl text-blue-700">{productDetails.title}</h1>
              <div className="flex gap-1 justify-start items-center">
                <img src={`/images/wish.png`} alt="Wishlist" />
                <h1 className="hover:text-orange-600 transition-all duration-300 cursor-pointer">
                  Add to wishlist
                </h1>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg pb-3">Key Features</h1>
              <div className="flex flex-col gap-1">
                <h1>Model: {productDetails.keyFeature.model}</h1>
                <h1>Resolution: {productDetails.keyFeature.resolution}</h1>
                <h1>Display: {productDetails.keyFeature.display}</h1>
                <h1>Ports: {productDetails.keyFeature.ports}</h1>
                <h1>Features: {productDetails.keyFeature.feature}</h1>
                <h1 className="text-xl font-semibold pt-3">
                  Price:{" "}
                  <span className="text-red-600 ">
                    {productDetails.price}Tk
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
