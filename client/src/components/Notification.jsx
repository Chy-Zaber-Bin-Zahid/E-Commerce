import { useLocation, useParams } from "react-router-dom";

function Notification({
  regNotification,
  logNotification,
  upNotification,
  setUpNotification,
  passUpdate,
}) {
  const location = useLocation();
  const { userId } = useParams();
  setTimeout(() => {
    setUpNotification(false);
  }, 2000);

  return (
    <div
      className={`${
        upNotification === true ? "translate-x-0" : "-translate-x-96"
      } ${regNotification === true ? "translate-x-0" : "-translate-x-96"} ${
        logNotification === true ? "translate-x-0" : "-translate-x-96"
      } fixed bottom-5 left-5 bg-green-500 p-4 rounded cursor-pointer transition-all delay-300 flex justify-center items-center  shadow-md shadow-gray-500`}
    >
      <h1 className="text-white font-semibold text-xl">
        {location.pathname === "/register" && "Registration complete ✔"}
        {location.pathname === "/login" && "Login successful ✔"}
        {location.pathname === `/profile/${userId}` && passUpdate === true
          ? "Password updated successful ✔"
          : "Profile updated successful ✔"}
      </h1>
    </div>
  );
}

export default Notification;
