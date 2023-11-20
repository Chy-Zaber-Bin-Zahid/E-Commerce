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
    <div>
      {productDetails.length === 0 ? (
        <h1 className="text-2xl text-center w-full p-36">Loading...</h1>
      ) : (
        <>
          <img
            src={`http://localhost:3001/images/products/${productDetails.image}`}
            alt={productDetails.title}
          />
          <div>hello</div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
