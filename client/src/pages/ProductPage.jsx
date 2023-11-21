import ProductDetails from "../components/Product Components/ProductDetails";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function ProductPage({ logged, setLogged, accountId }) {
  return (
    <div>
      <Navbar setLogged={setLogged} logged={logged} accountId={accountId} />
      <ProductDetails />
      <Footer />
    </div>
  );
}

export default ProductPage;
