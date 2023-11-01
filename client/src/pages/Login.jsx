import { useState } from "react";
import LoginRegister from "../components/LoginRegister";
import Notification from "../components/Notification";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Login() {
  const [logNotification, setLogNotification] = useState(false);
  return (
    <div>
      <Navbar />
      <LoginRegister setLogNotification={setLogNotification} />
      <Notification logNotification={logNotification} />
      <Footer/>
    </div>
  );
}

export default Login;
