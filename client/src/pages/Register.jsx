import Navbar from "../components/navbar";
import LoginRegister from "../components/LoginRegister";
import Notification from "../components/Notification";
import { useState } from "react";

function Register() {
  const [regNotification, setRegNotification] = useState(false);

  return (
    <div>
      <Navbar />
      <LoginRegister setRegNotification={setRegNotification} />
      <Notification regNotification={regNotification} />
    </div>
  );
}

export default Register;
