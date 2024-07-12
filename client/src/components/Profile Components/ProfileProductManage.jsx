import { useEffect, useState } from "react";
import ProfileTable from "./ProfileTable";
import axios from "axios";
import ProfileAdd from "./ProfileAdd";

function ProfileProductManage() {
  const [active, setActive] = useState("add");
  const table = "product management";
  const [storeValue, setStoreValue] = useState("");
  const [featureProduct, setFeatureProduct] = useState([]);
  const [addClicked, setAddClicked] = useState(false);

  const handleChange = (e) => {
    setStoreValue(e.target.value);
  };

  useEffect(() => {
    const handelFeatureProductFetch = async () => {
      try {
        const result = await axios.get(
          "https://smart-tech-ec8z.onrender.com/api/user/product",
          {
            params: {
              fields: ["title", "_id"],
            },
          }
        );
        const data = result.data.payload.allProduct;
        if (storeValue.length !== 0) {
          const userWithInputInTitle = data.filter((product) =>
            product.title.includes(storeValue)
          );
          setFeatureProduct(userWithInputInTitle);
        } else {
          setFeatureProduct(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handelFeatureProductFetch();
  }, [storeValue]);

  return (
    <>
      <div className="border-2 flex justify-between items-center mt-4 gap-2 rounded">
        <div
          onClick={() => setActive("add")}
          className={`flex gap-1 px-2 transition-all duration-200 cursor-pointer  py-2 font-semibold rounded justify-center w-full ${
            active === "add" && "bg-orange-400 text-white"
          } `}
        >
          <h1>Add</h1>
        </div>
        {/* <div
          onClick={() => setActive("edit")}
          className={`flex gap-1 px-2 transition-all duration-200 cursor-pointer  py-2 font-semibold rounded justify-center w-full ${
            active === "edit" && "bg-orange-400 text-white"
          } `}
        >
          <h1>Edit</h1>
        </div> */}
        <div
          onClick={() => setActive("delete")}
          className={`flex gap-1 px-2 transition-all duration-200 cursor-pointer  py-2 font-semibold rounded justify-center w-full ${
            active === "delete" && "bg-orange-400 text-white"
          } `}
        >
          <h1>Delete</h1>
        </div>
      </div>
      {active === "add" && (
        <ProfileAdd setAddClicked={setAddClicked} addClicked={addClicked} />
      )}
      {active === "delete" && (
        <div>
          <input
            className="py-2 px-4 w-full rounded focus:outline-none bg-slate-50 border mt-6 mb-2"
            placeholder="Search by title"
            type="text"
            list="options"
            onChange={(e) => handleChange(e)}
          />
          <ProfileTable
            table={table}
            storeValue={storeValue}
            featureProduct={featureProduct}
            setFeatureProduct={setFeatureProduct}
            addClicked={addClicked}
          />
        </div>
      )}
    </>
  );
}

export default ProfileProductManage;
