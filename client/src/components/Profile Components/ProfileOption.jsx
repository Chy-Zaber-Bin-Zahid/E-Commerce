import { Link } from "react-router-dom";

function ProfileOption({
  setLogged,
  setSlider,
  setSliderOpen,
  setCartNumber,
  adminCheck,
  setAccountId
}) {
  // Admin
  const adminList = [
    {
      id: 1,
      image: "profileMini.png",
      title: "Edit Profile",
      path: "editProfile",
    },
    {
      id: 2,
      image: "change.png",
      title: "Change Password",
      path: "changePassword",
    },
    {
      id: 3,
      image: "order.png",
      title: "Orders History",
      path: "orders",
    },
    {
      id: 4,
      image: "wish.png",
      title: "Wish List",
      path: "wishList",
    },
    {
      id: 5,
      image: "payment.png",
      title: "Your Transactions",
      path: "paymentHistory",
    },
    {
      id: 6,
      image: "users.png",
      title: "Users Management",
      path: "users",
    },
    {
      id: 7,
      image: "product.png",
      title: "Product Management",
      path: "product",
    },
    {
      id: 8,
      image: "logout.png",
      title: "Logout",
      path: "login",
    },
  ];
  // User
  const userList = [
    {
      id: 1,
      image: "profileMini.png",
      title: "Edit Profile",
      path: "editProfile",
    },
    {
      id: 2,
      image: "change.png",
      title: "Change Password",
      path: "changePassword",
    },
    {
      id: 3,
      image: "order.png",
      title: "Orders",
      path: "orders",
    },
    {
      id: 4,
      image: "wish.png",
      title: "Wish List",
      path: "wishList",
    },
    {
      id: 5,
      image: "payment.png",
      title: "Your Transactions",
      path: "paymentHistory",
    },
    {
      id: 6,
      image: "logout.png",
      title: "Logout",
      path: "login",
    },
  ];

  // Logout handle
  const handleLogged = (path) => {
    if (path === "login") {
      setLogged(false);
      setCartNumber(0);
      // setAccountId("");
    }
  };

  // Profile Slider handle
  const handleSlider = (id) => {
    setSlider(true);
    if (adminCheck) {
      if (id !== 8) {
        if (id === 1) {
          setSliderOpen("edit");
        } else if (id === 2) {
          setSliderOpen("change");
        } else if (id === 3) {
          setSliderOpen("order");
        } else if (id === 4) {
          setSliderOpen("wish");
        } else if (id === 5) {
          setSliderOpen("payment");
        } else if (id === 6) {
          setSliderOpen("users");
        } else {
          setSliderOpen("product");
        }
      }
    } else {
      if (id !== 6) {
        if (id === 1) {
          setSliderOpen("edit");
        } else if (id === 2) {
          setSliderOpen("change");
        } else if (id === 3) {
          setSliderOpen("order");
        } else if (id === 4) {
          setSliderOpen("wish");
        } else {
          setSliderOpen("payment");
        }
      }
    }
  };

  const handleBoth = (path, id) => {
    handleLogged(path);
    handleSlider(id);
  };

  return (
    <>
      {adminCheck ? (
        <div className="grid grid-cols-4 gap-4">
          {adminList.map((menu) => (
            <Link
              onClick={() => handleBoth(menu.path, menu.id)}
              to={menu.id === 8 ? `/${menu.path}` : undefined}
              key={menu.id}
              className="flex gap-1 flex-col justify-center items-center border rounded py-16 shadow-md hover:cursor-pointer hover:border-sky-800 transition-all duration-300"
            >
              <img
                className="bg-blue-200 p-2 rounded-full"
                src={`/images/${menu.image}`}
                alt={`${menu.title}`}
              />
              <h1>{`${menu.title}`}</h1>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {userList.map((menu) => (
            <Link
              onClick={() => handleBoth(menu.path, menu.id)}
              to={menu.id === 6 ? `/${menu.path}` : undefined}
              key={menu.id}
              className="flex gap-1 flex-col justify-center items-center border rounded py-16 shadow-md hover:cursor-pointer hover:border-sky-800 transition-all duration-300"
            >
              <img
                className="bg-blue-200 p-2 rounded-full"
                src={`/images/${menu.image}`}
                alt={`${menu.title}`}
              />
              <h1>{`${menu.title}`}</h1>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ProfileOption;
