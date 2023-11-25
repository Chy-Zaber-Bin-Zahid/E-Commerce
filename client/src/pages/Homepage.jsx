import Footer from "../components/Footer";
import FeatureProduct from "../components/Homepage Components/FeatureProduct";
import Literature from "../components/Homepage Components/Literature";
import Navbar from "../components/navbar";

function Homepage({ logged, setLogged, accountId, setAccountId, setCartNumber }) {
  return (
    <div className="bg-gray-100 ">
      <Navbar
        setLogged={setLogged}
        logged={logged}
        accountId={accountId}
        setAccountId={setAccountId}
        setCartNumber={setCartNumber}
      />
      <h1 className="text-center text-2xl py-1 font-semibold max-[800px]:text-xl">
        Featured Products
      </h1>
      <p className="text-center max-[800px]:text-sm ">
        Check & Get Your Desired Product!
      </p>
      <FeatureProduct />
      <Literature />
      <Footer />
    </div>
  );
}

export default Homepage;
