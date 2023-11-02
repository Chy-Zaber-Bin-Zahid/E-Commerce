import Footer from "../components/Footer";
import FeatureProduct from "../components/Homepage Components/FeatureProduct";
import Literature from "../components/Homepage Components/Literature";
import Navbar from "../components/navbar";

function Homepage() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <h1 className="text-center text-2xl py-1 font-semibold">
        Featured Products
      </h1>
      <p className="text-center ">Check & Get Your Desired Product!</p>
      <FeatureProduct />
      <Literature />
      <Footer />
    </div>
  );
}

export default Homepage;
