import { Link } from "react-router-dom";

function ProfileOption({ setLogged, setSlider, setSliderOpen }) {
  const list = [
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
    }
  };

  // Profile Slider handle
  const handleSlider = (id) => {
    if (id !== 6) {
      setSlider(true);
      if (id === 1) {
        setSliderOpen("edit");
      } else if (id === 2) {
        setSliderOpen("change");
      }
    } else if (id === 3) {
      setSliderOpen("order");
    } else if (id === 4) {
      setSliderOpen("wish");
    } else {
      setSliderOpen("payment");
    }
  };

  const handleBoth = (path, id) => {
    handleLogged(path);
    handleSlider(id);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {list.map((product) => (
        <div
          onClick={() => handleBoth(product.path, product.id)}
          // onClick={() => handleLogged(product.path)}
          // to={`/${product.path}`}
          key={product.id}
          className="flex gap-1 flex-col justify-center items-center border rounded py-16 shadow-md hover:cursor-pointer hover:border-sky-800 transition-all duration-300"
        >
          <img
            className="bg-blue-200 p-2 rounded-full"
            src={`/images/${product.image}`}
            alt={`${product.title}`}
          />
          <h1>{`${product.title}`}</h1>
        </div>
      ))}
    </div>
  );
}

export default ProfileOption;
