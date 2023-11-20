import ProductDetails from "../components/Product Components/ProductDetails";
import Navbar from "../components/navbar";

function ProductPage({ logged, setLogged, accountId }) {
  return (
    <div>
      <Navbar setLogged={setLogged} logged={logged} accountId={accountId} />
      <ProductDetails />
    </div>
  );
}

export default ProductPage;
