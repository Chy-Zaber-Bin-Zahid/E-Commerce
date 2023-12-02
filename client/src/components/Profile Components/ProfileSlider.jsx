import { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfilePassChange from "./ProfilePassChange";
import ProfileWishList from "./ProfileWishList";

function ProfileSlider({ sliderOpen, setSliderOpen, setUserInfo, adminCheck }) {
  const [upNotification, setUpNotification] = useState(false);

  // admin
  const adminList = [
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
      image: "users.png",
      title: "Users",
      path: "users",
    },
    {
      id: 5,
      image: "authority.png",
      title: "Authority",
      path: "authority",
    },
  ];

  // user
  const userList = [
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
    console.log(path);
  };

  return (
    <>
      {adminCheck ? (
        <div>
          <div className="border-b-2 flex justify-left items-center">
            {adminList.map((slider) => (
              <div
                onClick={() => handleSlide(slider.path)}
                className="flex gap-1 px-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:text-orange-600 py-4"
                key={slider.id}
              >
                <img src={`/images/${slider.image}`} alt={slider.title} />
                <h1>{`${slider.title}`}</h1>
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
        </div>
      ) : (
        <div>
          <div className="border-b-2 flex justify-left items-center">
            {userList.map((slider) => (
              <div
                onClick={() => handleSlide(slider.path)}
                className="flex gap-1 px-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:text-orange-600 py-4"
                key={slider.id}
              >
                <img src={`/images/${slider.image}`} alt={slider.title} />
                <h1>{`${slider.title}`}</h1>
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
          {sliderOpen === "wish" && <ProfileWishList />}
        </div>
      )}
    </>
  );
}

export default ProfileSlider;
