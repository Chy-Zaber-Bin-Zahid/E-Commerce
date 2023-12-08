import { useLocation, useParams } from "react-router-dom";

function Notification({
  regNotification,
  logNotification,
  upNotification,
  setUpNotification,
  passUpdate = false,
  wishListNotification = false,
  setWishListNotification,
  paymentNotification = false,
  setAddNotification,
  addNotification = false,
}) {
  const location = useLocation();
  const { userId } = useParams();
  setTimeout(() => {
    setUpNotification(false);
  }, 2000);

  if (wishListNotification) {
    setTimeout(() => {
      setWishListNotification(false);
    }, 2000);
  }

  if (addNotification) {
    setTimeout(() => {
      setAddNotification(false);
    }, 2000);
  }

  if (paymentNotification) {
    setTimeout(() => {
      setWishListNotification(false);
    }, 2000);
  }

  return (
    <div
      className={`
      ${addNotification === true ? "translate-x-0" : "-translate-x-96"} 
      ${paymentNotification === true ? "translate-x-0" : "-translate-x-96"} 
      ${upNotification === true ? "translate-x-0" : "-translate-x-96"} ${
        regNotification === true ? "translate-x-0" : "-translate-x-96"
      } ${logNotification === true ? "translate-x-0" : "-translate-x-96"} ${
        wishListNotification === true ? "translate-x-0" : "-translate-x-96"
      } fixed bottom-5 left-5 bg-green-500 p-4 rounded cursor-pointer transition-all delay-300 flex justify-center items-center  shadow-md shadow-gray-500`}
    >
      <h1 className="text-white font-semibold text-xl">
        {location.pathname === "/register" && "Registration complete ✔"}
        {location.pathname === "/login" && "Login successful ✔"}
        {location.pathname === `/profile/${userId}` &&
          passUpdate === false &&
          addNotification === false &&
          "Profile updated successfully ✔"}
        {passUpdate === true && "Password updated successfully ✔"}
        {location.pathname === `/product/${userId}` &&
          "Added to wish list successfully ✔"}
        {location.pathname === `/payment/${userId}` &&
          "Payment successfully done ✔"}
        {addNotification === true && "Product added successfully ✔"}
      </h1>
    </div>
  );
}

export default Notification;
