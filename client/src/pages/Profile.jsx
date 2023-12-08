import Footer from "../components/Footer";
import ProfileMain from "../components/Profile Components/ProfileMain";
import Navbar from "../components/navbar";

function Profile({
  setLogged,
  logged,
  setCartNumber,
  adminCheck,
  setPayment,
  payment,
  setAccountId
}) {
  return (
    <div>
      <Navbar
        logged={logged}
        setLogged={setLogged}
        setCartNumber={setCartNumber}
      />
      <ProfileMain
        setLogged={setLogged}
        setCartNumber={setCartNumber}
        adminCheck={adminCheck}
        setPayment={setPayment}
        payment={payment}
        setAccountId={setAccountId}
      />
      <Footer />
    </div>
  );
}

export default Profile;
