function DeliverMethod({ setDelivery }) {
  const handelDelivery = (del) => {
    if (del === "home") {
      setDelivery("home");
    } else {
      setDelivery("store");
    }
  };

  return (
    <div className="rounded border p-6 bg-white">
      <h1 className="font-semibold text-xl pb-4 border-b">
        <span className="px-3 py-1 bg-red-100 rounded-full text-red-500  text-lg mr-4">
          3
        </span>
        Delivery Method
      </h1>
      <div>
        <label className="py-2 inline-block" htmlFor="">
          Select a delivery method
        </label>
        <br />
        <input
          className="mr-4"
          type="radio"
          id="home"
          name="delivery"
          value="home"
          defaultChecked
          onClick={() => handelDelivery("home")}
        />
        <span>Home Delivery - 60Tk</span>
        <br />
        <input
          className="mr-4"
          type="radio"
          id="store"
          name="delivery"
          value="store"
          onClick={() => handelDelivery("store")}
        />
        <span>Store Pickup - 0Tk</span>
      </div>
    </div>
  );
}

export default DeliverMethod;
