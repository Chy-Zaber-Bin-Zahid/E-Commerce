import { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfilePassChange from "./ProfilePassChange";

function ProfileSlider({ sliderOpen, setSliderOpen, setUserInfo }) {
  const [upNotification, setUpNotification] = useState(false);
  const list = [
    {
      id: 1,
      image: "profileMini.png",
      title: "Edit Account",
      path: "edit",
    },
    {
      id: 2,
      image: "change.png",
      title: "Password",
      path: "change",
    },
    {
      id: 3,
      image: "order.png",
      title: "Orders",
      path: "order",
    },
    {
      id: 4,
      image: "wish.png",
      title: "Saved List",
      path: "wish",
    },
    {
      id: 5,
      image: "payment.png",
      title: "Your Transactions",
      path: "payment",
    },
  ];

  // Product Slide handle
  const handleSlide = (path) => {
    setSliderOpen(path);
  };

  return (
    <>
      <div className="border-b-2 flex justify-left items-center">
        {list.map((product) => (
          <div
            onClick={() => handleSlide(product.path)}
            className="flex gap-1 px-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:text-orange-600 py-4"
            key={product.id}
          >
            <img src={`/images/${product.image}`} alt={product.title} />
            <h1>{`${product.title}`}</h1>
          </div>
        ))}
      </div>
      {sliderOpen === "edit" && (
        <ProfileEdit
          upNotification={upNotification}
          setUserInfo={setUserInfo}
          setUpNotification={setUpNotification}
        />
      )}
      {sliderOpen === "change" && (
        <ProfilePassChange
          setUpNotification={setUpNotification}
          upNotification={upNotification}
        />
      )}
    </>
  );
}

export default ProfileSlider;