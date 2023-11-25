import axios from "axios";

function ProductDetailsDescription({
  checkLog,
  wishListExist,
  setCheckLog,
  setWishListNotification,
  setWishListExist,
  productDetails,
  accountId,
  userId,
}) {
  // Whish list sent to backend
  const handleWishList = async () => {
    try {
      const { title, image, price } = productDetails;
      const result = await axios.post(
        `http://localhost:3001/api/user/wishList/${accountId}`,
        { title, image, price, userId }
      );
      setWishListNotification, setWishListExist(true);
    } catch (err) {
      const errorMessage = err.response.data.error;
      if (errorMessage === "Already in wish list") {
        setWishListExist(true);
      }
    }
  };

  return (
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
              <span className="text-red-600 ">{productDetails.price}Tk</span>
            </h1>
          </div>
        </div>
      </div>
  );
}

export default ProductDetailsDescription;
