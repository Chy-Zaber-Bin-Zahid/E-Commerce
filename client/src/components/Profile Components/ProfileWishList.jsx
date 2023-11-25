import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProfileWishList() {
  const { userId } = useParams();
  const [wishList, setWishList] = useState([]);
  const [wishEmpty, setWishEmpty] = useState(false);

  const handleDeleteWish = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:3001/api/user/wishListDelete/${id}`,
        {
          userId,
        }
      );
      const deletedWishListId = result.data.payload.deletedWishListId;
      const updatedWishList = wishList.filter(
        (wish) => wish._id !== deletedWishListId
      );
      setWishList(updatedWishList);
      if (updatedWishList.length === 0) {
        setWishEmpty(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleWishList = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3001/api/user/wishList/${userId}`,
          {
            params: {
              fields: ["image", "title", "price"],
            },
          }
        );
        const data = result.data.payload.wishList;
        setWishList(data);
        if (data.length === 0) {
          setWishEmpty(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleWishList();
  }, []);

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-2xl text-blue-700">My Wish List</h1>
      {wishList.length !== 0 ? (
        wishList.map((wish) => (
          <>
            <Link 
            to={`/product/${wish.productId}`}
            className="border flex justify-between items-center px-4 py-2 rounded shadow-sm shadow-gray-300 hover:shadow-gray-500 hover:shadow-md transition-all duration-300">
              <div
                className="flex justify-start gap-4 items-center"
                key={wish._id}
              >
                <img
                  src={`http://localhost:3001/images/products/${wish.image}`}
                  alt={wish.title}
                  className="w-16"
                />
                <div>
                  <h1 className="font-semibold">{wish.title}</h1>
                  <h1 className="text-red-600">{wish.price}Tk</h1>
                </div>
              </div>
              <img
                onClick={() => handleDeleteWish(wish._id)}
                className="w-6 cursor-pointer transition-transform transform-gpu hover:scale-125"
                src="/images/delete.png"
                alt="Delete"
              />
            </Link>
          </>
        ))
      ) : !wishEmpty ? (
        <h1 className="text-xl text-center w-full px-10">Loading...</h1>
      ) : (
        <h1>Your wish list is empty.</h1>
      )}
    </div>
  );
}

export default ProfileWishList;
