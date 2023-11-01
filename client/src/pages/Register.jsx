import Navbar from "../components/navbar";
import LoginRegister from "../components/LoginRegister";
import Notification from "../components/Notification";
import { useState } from "react";
import Footer from "../components/Footer";

function Register() {
  const [regNotification, setRegNotification] = useState(false);

  return (
    <div>
      <Navbar />
      <LoginRegister setRegNotification={setRegNotification} />
      <Notification regNotification={regNotification} />
      <Footer />
    </div>
  );
}

export default Register;
