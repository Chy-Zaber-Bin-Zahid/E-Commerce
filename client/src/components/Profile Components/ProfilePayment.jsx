import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfilePayment({ setPayment, payment }) {
  const { userId } = useParams();
  const [paymentUpdate, setPaymentUpdate] = useState(false);
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
    setPaymentUpdate(true);
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

  // update payment method
  useEffect(() => {
    const handleUpdateProduct = async () => {
      if (paymentUpdate) {
        try {
          const result = await axios.patch(
            `https://smart-tech-ec8z.onrender.com/api/user/payment/${userId}`,
            { payment }
          );
          // Handle successful update
          const data = result.data.payload.user.payment;
          console.log("if", data);
        } catch (err) {
          // Handle error
          console.error("Error updating product:", err);
        }
      } else {
        try {
          const result = await axios.get(
            `https://smart-tech-ec8z.onrender.com/api/user/payment/${userId}`,
            {
              params: {
                fields: ["payment"],
              },
            }
          );
          // Handle successful update
          const data = result.data.payload.user.payment;
          setPayment(() => {
            return data;
          });
        } catch (err) {
          // Handle error
          console.error("Error updating product:", err);
        }
      }
    };
    handleUpdateProduct();
  }, [payment]);

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <div>
        <h1 className="text-2xl text-blue-700 mb-3">
          Choose Your Transactions Method
        </h1>
        {store.map((item) => (
          <React.Fragment key={item.id}>
            <input
              className="mr-4"
              type="radio"
              id={item.id}
              name="payment"
              value={item.id}
              checked={item.id === payment}
              onChange={() => handelPayment(item.id)}
            />
            <span>{item.title}</span>
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProfilePayment;
