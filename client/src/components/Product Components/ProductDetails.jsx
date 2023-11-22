import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductDetails({ accountId, setWishListNotification }) {
  const { userId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [checkLog, setCheckLog] = useState(false);
  const [wishListExist, setWishListExist] = useState(false);

  // Whish list sent to backend
  const handleWishList = async () => {
    try {
      const { title, image, price } = productDetails;
      const result = await axios.post(
        `http://localhost:3001/api/user/wishList/${accountId}`,
        { title, image, price, userId }
      );
      setWishListNotification(true);
      
    } catch (err) {
      const errorMessage = err.response.data.error;
      if (errorMessage === "Already in wish list") {
        setWishListExist(true);
      }
    }
  };

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
        setCheckLog(false);
        setWishListExist(false);
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
            <div className="pb-5 flex flex-col gap-2">
              <h1 className="text-2xl text-blue-700">{productDetails.title}</h1>
              <div className="flex gap-1 justify-start items-center">
                <img src={`/images/wish.png`} alt="Wishlist" />
                <h1
                  onClick={() => {
                    if (accountId.length !== 0) {
                      handleWishList();
                    } else {
                      setCheckLog(true);
                    }
                  }}
                  className="hover:text-orange-600 transition-all duration-300 cursor-pointer"
                >
                  Add to wishlist
                </h1>
              </div>
              {checkLog && (
                <p className="text-red-600 text-sm">You need to login first!</p>
              )}
              {wishListExist && (
                <p className="text-red-600 text-sm">
                  You already added this in wish list!
                </p>
              )}
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
