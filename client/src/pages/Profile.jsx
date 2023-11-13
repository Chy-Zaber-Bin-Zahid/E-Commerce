import Footer from "../components/Footer";
import ProfileMain from "../components/Profile Components/ProfileMain";
import Navbar from "../components/navbar";

function Profile({ setLogged, logged}) {
  return (
    <div>
      <Navbar logged={logged} setLogged={setLogged} />
      <ProfileMain setLogged={setLogged}/>
      <Footer />
    </div>
  );
}

export default Profile;
