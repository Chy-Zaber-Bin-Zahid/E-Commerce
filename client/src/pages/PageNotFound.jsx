import Navbar from "../components/navbar";

function PageNotFound() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center gap-4 flex-col py-5">
      <h1 className="text-4xl">Uh-Oh..</h1>
      <p>The page your looking for may have been moved, deleted,</p>
      <p>or possibly never existed!</p>
      <h1 className="text-9xl">404</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
