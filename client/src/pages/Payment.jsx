import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import CustomerInfo from "../components/Payment Components/CustomerInfo";
import PaymentMethod from "../components/Payment Components/PaymentMethod";
import DeliverMethod from "../components/Payment Components/DeliverMethod";
import OrderShow from "../components/Payment Components/OrderShow";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

function Payment({
  setLogged,
  logged,
  accountId,
  setCartNumber,
  setTotalCost,
  setPayCheck,
  payCheck,
  payment,
  setPayment,
}) {
  const [delivery, setDelivery] = useState("home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [telLength, setTelLength] = useState(false);
  const [totalCost, setTotalCostCart] = useState(0);
  const [paymentNotification, setPaymentNotification] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus(true);
    try {
      const result = await axios.post(
        `http://localhost:3001/api/user/payment/${accountId}`,
        {
          name,
          email,
          address,
          telephone,
          comment,
          delivery,
          payment,
          totalCost,
        }
      );
      setPaymentStatus(false);
      setPaymentNotification(true);
      setPayCheck(!payCheck);
      setTimeout(() => {
        navigate(`/profile/${accountId}`);
      }, 2000); // 2000 milliseconds (2 second)
    } catch (err) {
      // User existing check by email
      if (err.response) {
        const errorMessage = err.response.data.error;
        if (errorMessage === "Telephone is less than 11") {
          setTelLength(true);
        }
      }
    }
  };

  return (
    <div className="bg-slate-50">
      <Navbar
        setLogged={setLogged}
        logged={logged}
        accountId={accountId}
        setCartNumber={setCartNumber}
        setTotalCost={setTotalCost}
      />
      <form onSubmit={handleSubmit} className="pt-10 pb-4 px-8">
        <h1 className="pb-4 text-2xl font-semibold">Checkout</h1>
        <div className="grid grid-cols-3 grid-rows-2 gap-x-7 gap-y-5">
          <CustomerInfo
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            telephone={telephone}
            setTelephone={setTelephone}
            email={email}
            setEmail={setEmail}
            setComment={setComment}
            telLength={telLength}
            setTelLength={setTelLength}
          />
          <PaymentMethod setPayment={setPayment} payment={payment} />
          <DeliverMethod setDelivery={setDelivery} />
          <OrderShow
            accountId={accountId}
            delivery={delivery}
            totalCost={totalCost}
            setTotalCostCart={setTotalCostCart}
          />
        </div>
        <div className="mt-4 text-right border-t pt-4">
          <button
            disabled={paymentStatus ? true : false}
            type="submit"
            className={`text-center ${
              paymentStatus ? "w-58 px-6" : "w-40"
            } bg-indigo-700 rounded py-2.5 text-white font-semibold hover:bg-indigo-800 transition-all duration-300`}
          >
            {paymentStatus
              ? "Payment Process Ongoing Please wait..."
              : "Confirm Order"}
          </button>
        </div>
      </form>
      <Notification paymentNotification={paymentNotification} />
      <Footer />
    </div>
  );
}

export default Payment;
