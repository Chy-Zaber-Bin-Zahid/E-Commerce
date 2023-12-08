import axios from "axios";
import { useEffect, useState } from "react";

function ProfileTable({
  userInfo,
  handleClick,
  storeValue,
  table = "",
  featureProduct = [],
  setFeatureProduct,
  addClicked,
}) {
  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    setCheckAdd(!checkAdd);
    console.log(addClicked, checkAdd);
  }, [addClicked]);

  const handelDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:3001/api/user/product/delete/${id}`
      );
      const deletedItemId = result.data.payload.deletedItem._id;
      const updatedProducts = featureProduct.filter(
        (item) => item._id !== deletedItemId
      );
      console.log(updatedProducts, deletedItemId);
      setFeatureProduct(() => updatedProducts);
    } catch (err) {
      const errorMessage = err.response.data.error;
      console.log(errorMessage);
    }
  };

  return (
    <>
      {table === "" ? (
        <table className="w-full mt-2 ">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 bg-slate-50  font-normal text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 bg-slate-50  border-l-2 border-white font-normal text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 bg-slate-50  border-l-2 border-white font-normal text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 bg-slate-50  border-l-2 border-white font-normal text-gray-600">
                Authority
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100">
            {userInfo.length !== 0 ? (
              userInfo.map((user) => (
                <tr className="border-b" key={user._id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2 border-l-2 border-white">
                    {user.email}
                  </td>
                  <td
                    className={`px-4 py-2 border-l-2 border-white ${
                      user.isBanned ? "text-red-500" : "text-green-500"
                    } `}
                  >
                    {user.isBanned ? "Banned" : "UnBanned"}{" "}
                    {user._id !== "653f86f89bddd7ba2d0417ea" && (
                      <button
                        onClick={() =>
                          handleClick(
                            user._id,
                            !user.isBanned ? "Ban" : "Unban"
                          )
                        }
                        className={`${
                          !user.isBanned
                            ? "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            : "bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        } float-right transition-all duration-300 `}
                      >
                        {!user.isBanned ? "Ban" : "UnBan"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border-l-2 border-white ">
                    {user.isAdmin ? "Yes" : "No"}
                    {user._id !== "653f86f89bddd7ba2d0417ea" && (
                      <button
                        onClick={() =>
                          handleClick(
                            user._id,
                            user.isAdmin ? "Unauthorize" : "Authorize"
                          )
                        }
                        className={`${
                          !user.isAdmin
                            ? "bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                            : "bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                        } float-right transition-all duration-300 `}
                      >
                        {user.isAdmin ? "Unauthorize" : "Authorize"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border-b text-center">
                  {storeValue.length !== 0
                    ? "No matching users found!"
                    : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table className="w-full mt-2 ">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 bg-slate-50  font-normal text-gray-600">
                Title
              </th>
              <th className="px-4 py-2 bg-slate-50  border-l-2 border-white font-normal text-gray-600">
                Id
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100">
            {featureProduct.length !== 0 ? (
              featureProduct.map((product) => (
                <tr className="border-b" key={product._id}>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2 border-l-2 border-white">
                    {product._id}{" "}
                    <button
                      onClick={() => handelDelete(product._id)}
                      className={`
                        bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded float-right transition-all duration-300 `}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border-b text-center">
                  {storeValue.length !== 0
                    ? "No matching products found!"
                    : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ProfileTable;
