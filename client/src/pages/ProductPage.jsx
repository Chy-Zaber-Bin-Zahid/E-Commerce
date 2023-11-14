import Navbar from "../components/navbar";

function ProductPage({ logged, setLogged, accountId }) {
  return (
    <div>
      <Navbar setLogged={setLogged} logged={logged} accountId={accountId} />
    </div>
  );
}

export default ProductPage;
