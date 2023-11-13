import { useState } from "react";
import LoginRegister from "../components/LoginRegister";
import Notification from "../components/Notification";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Login({ setLogged, logged, setAccountId }) {
  const [logNotification, setLogNotification] = useState(false);
  return (
    <div>
      <Navbar logged={logged} setLogged={setLogged} />
      <LoginRegister
        setLogNotification={setLogNotification}
        setLogged={setLogged}
        setAccountId={setAccountId}
      />
      <Notification logNotification={logNotification} />
      <Footer />
    </div>
  );
}

export default Login;
