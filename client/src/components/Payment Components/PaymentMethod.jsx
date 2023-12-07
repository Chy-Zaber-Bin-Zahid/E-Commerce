import React from "react";

function PaymentMethod({ setPayment }) {
  const store = [
    {
      id: "cash",
      title: "Cash on Delivery",
    },
    {
      id: "bkash",
      title: "Bkash",
    },
    {
      id: "nagad",
      title: "Nagad",
    },
    {
      id: "rocket",
      title: "Rocket",
    },
    {
      id: "upay",
      title: "Upay",
    },
    {
      id: "credit",
      title: "Credit Card",
    },
    {
      id: "debit",
      title: "Debit Card",
    },
  ];

  const handelPayment = (pay) => {
    if (pay === "cash") {
      setPayment("cash");
    } else if (pay === "bkash") {
      setPayment("bkash");
    } else if (pay === "nagad") {
      setPayment("nagad");
    } else if (pay === "rocket") {
      setPayment("rocket");
    } else if (pay === "upay") {
      setPayment("upay");
    } else if (pay === "credit") {
      setPayment("credit");
    } else {
      setPayment("debit");
    }
  };

  return (
    <div className="rounded border p-6 bg-white">
      <h1 className="font-semibold text-xl pb-4 border-b">
        <span className="px-3 py-1 bg-red-100 rounded-full text-red-500  text-lg mr-4">
          2
        </span>
        Payment Method
      </h1>
      <div>
        <label className="py-2 inline-block" htmlFor="">
          Select a payment method
        </label>
        <br />
        {store.map((item, index) => (
          <React.Fragment key={item.id}>
            <input
              className="mr-4"
              type="radio"
              id={item.id}
              name="payment"
              value={item.id}
              defaultChecked={index === 0}
              onClick={() => handelPayment(item.id)}
            />
            <span>{item.title}</span>
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethod;
