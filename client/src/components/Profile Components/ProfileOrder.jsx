import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProfileOrder({ adminCheck }) {
  const { userId } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [orderEmpty, setOrderEmpty] = useState(false);
  const [expendStates, setExpendStates] = useState([]);

  useEffect(() => {
    const handleWishList = async () => {
      try {
        const result = await axios.get(
          `https://smart-tech-ec8z.onrender.com/api/user/order/${userId}`,
          {
            params: {
              fields: [
                "name",
                "email",
                "address",
                "telephone",
                "comment",
                "payment",
                "title",
                "productId",
                "totalCost",
                "createdAt",
              ],
            },
          }
        );
        const data = result.data.payload.order;
        if (!adminCheck) {
          const filteredData = data.filter((order) => order.userId === userId);
          setOrderList(filteredData);
          setExpendStates(Array(filteredData.length).fill(false));
          if (filteredData.length === 0) {
            setOrderEmpty(true);
          }
        } else {
          setOrderList(data);
          setExpendStates(Array(data.length).fill(false));
          if (data.length === 0) {
            setOrderEmpty(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleWishList();
  }, []);

  const handleExpand = (index) => {
    const updatedExpendStates = [...expendStates];
    updatedExpendStates[index] = !updatedExpendStates[index];
    setExpendStates(updatedExpendStates);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h1 className="text-2xl text-blue-700">
        {adminCheck ? "All The" : "My"} Order List
      </h1>
      {orderList.length !== 0 ? (
        orderList.map((order, index) => (
          <>
            <div
              key={order._id}
              className="border px-4 py-2 rounded shadow-sm shadow-gray-300 hover:shadow-gray-500 hover:shadow-md transition-all duration-300 rounded-b-none"
            >
              <div
                className={`flex justify-between items-center v ${
                  expendStates[index] && "border-b-2 pb-2"
                }`}
              >
                <h1 className="font-semibold">Order {index + 1}</h1>
                <h1 className="text-gray-500">
                  {new Date(order.createdAt).getFullYear()}-
                  {new Date(order.createdAt).getMonth() + 1}-
                  {new Date(order.createdAt).getDate()}{" "}
                  {new Date(order.createdAt).getHours()}:
                  {new Date(order.createdAt).getMinutes()}:
                  {new Date(order.createdAt).getSeconds()}
                </h1>
                <img
                  onClick={() => handleExpand(index)} // Pass the index of the clicked item
                  className={`w-6 cursor-pointer transition-all duration-300 ${
                    expendStates[index] && "rotate-90" // Apply animation based on the expand state
                  }`}
                  src="/images/expend.png"
                  alt="Expend"
                />
              </div>
              {expendStates[index] && (
                <div className="grid grid-cols-2 gap-2 py-2">
                  <h1>
                    <b>Name:</b> {order.name}
                  </h1>
                  <h1>
                    <b>Email:</b> {order.email}
                  </h1>
                  <h1>
                    <b>Address:</b> {order.address}
                  </h1>
                  <h1>
                    <b>Telephone:</b> {order.telephone}
                  </h1>
                  <h1>
                    <b>Comment:</b> {order.comment}
                  </h1>
                  <h1>
                    <b>Payment:</b>{" "}
                    {order.payment === "cash" && "Cash on Delivery"}
                    {order.payment === "bkash" && "Bkash"}
                    {order.payment === "nagad" && "Nagad"}
                    {order.payment === "rocket" && "Rocket"}
                    {order.payment === "upay" && "Upay"}
                    {order.payment === "credit" && "Credit Card"}
                    {order.payment === "debit" && "Debit Card"}
                  </h1>
                  <div className="col-span-2">
                    <h1 className="text-center font-semibold text-xl">
                      Products
                    </h1>
                    {order.title.map((title, i) => (
                      <Link key={i} to={`/product/${order.productId[i]}`}>
                        <h1 className="hover:text-blue-700 transition-all duration-300">
                          <span>{i + 1}. </span>
                          {title}
                        </h1>
                      </Link>
                    ))}
                    <h1>
                      <b>Total Cost:</b>{" "}
                      <span className="text-red-600 font-semibold">
                        {order.totalCost}Tk
                      </span>
                    </h1>
                    {adminCheck && (
                      <h1 className="text-gray-500">
                        <b>User Id:</b> {order.userId}
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ))
      ) : !orderEmpty ? (
        <h1 className="text-xl text-center w-full px-10">Loading...</h1>
      ) : (
        <h1>{adminCheck ? "Order" : "Your order"} list is empty.</h1>
      )}
    </div>
  );
}

export default ProfileOrder;
