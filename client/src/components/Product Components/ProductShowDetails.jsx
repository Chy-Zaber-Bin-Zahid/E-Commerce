import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetailsDescription from "./ProductDescription";
import ProductIncrement from "./ProductIncrement";

function ProductDetails({
  accountId,
  setWishListNotification,
  logged,
  setCartNumber,
  handleCartBounce,
}) {
  const { userId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [checkLog, setCheckLog] = useState(false);
  const [wishListExist, setWishListExist] = useState(false);

  useEffect(() => {
    const handelFeatureProductFetch = async () => {
      try {
        const result = await axios.get(
          `https://smart-tech-ec8z.onrender.com/api/user/product/${userId}`,
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
              src={`https://smart-tech-ec8z.onrender.com/images/products/${productDetails.image}`}
              alt={productDetails.title}
              className="w-96"
            />
          </div>
          <div>
            <ProductDetailsDescription
              setCheckLog={setCheckLog}
              checkLog={checkLog}
              wishListExist={wishListExist}
              setWishListNotification={setWishListNotification}
              setWishListExist={setWishListExist}
              productDetails={productDetails}
              accountId={accountId}
              userId={userId}
            />
            <ProductIncrement
              productDetails={productDetails}
              accountId={accountId}
              logged={logged}
              setCartNumber={setCartNumber}
              handleCartBounce={handleCartBounce}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
