import { useState } from "react";
import axios from "axios";
import Notification from "../Notification";

function ProfileAdd({ setAddClicked, addClicked }) {
  const [price, setPrice] = useState(false);
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [features, setFeatures] = useState([{ name: "", description: "" }]);
  const [addNotification, setAddNotification] = useState(false);

  const addInput = () => {
    setFeatures([...features, { name: "", description: "" }]);
  };

  const removeInput = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const handleInputChange = (index, event, field) => {
    const newFeatures = [...features];
    newFeatures[index][field] = event.target.value;
    setFeatures(newFeatures);
  };

  const handleChange = (event, setFunc) => {
    const inputValue = event.target.value;
    setFunc(inputValue);
  };

  const handelPrice = () => {
    if (!price) {
      setPrice(true);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("priceInput", priceInput);
    formData.append("features", JSON.stringify(features));
    try {
      const result = await axios.post(
        "http://localhost:3001/api/user/upload",
        formData
      );
      setAddClicked(!addClicked);
      setAddNotification(true);
      // Handle the result
    } catch (err) {
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
      <div className="rounded border p-6 bg-slate-50 h-fit">
        <div className="flex flex-col">
          <label htmlFor="">
            Product Title <span className="text-red-600">*</span>
          </label>
          <input
            required
            className="mt-1 border-2 p-2 rounded placeholder-gray-500 "
            type="text"
            placeholder="Product Title"
            onChange={(event) => handleChange(event, setTitle)}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="">
            Product Price <span className="text-red-600">*</span>
          </label>
          <input
            required
            className="mt-1 border-2 p-2 rounded placeholder-gray-500 "
            type="text"
            placeholder="Product Price"
            onFocus={handelPrice}
            onChange={(event) => handleChange(event, setPriceInput)}
          />
          {price && (
            <p className="text-red-600 text-sm mt-1">
              Do not use Tk after writing price!
            </p>
          )}
        </div>
        <div className="flex flex-col mt-4 ">
          <label htmlFor="">
            Product Image <span className="text-red-600">*</span>
          </label>
          <input
            required
            className="mt-1 py-2 rounded cursor-pointer w-fit"
            accept="image/jpeg, image/png, image/svg+xml"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            name="image"
          />
        </div>
      </div>
      <div className="rounded border p-6 bg-slate-50 ">
        <div className="">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">
              Add Product Key Feature
            </span>
            <img
              className="w-6 cursor-pointer transition-all duration-300 hover:scale-110"
              src="/images/add.png"
              alt="Add"
              onClick={addInput}
            />
          </div>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border-b flex flex-col ${
                index !== 0 ? "pt-2 pb-4" : "border-b border-t pb-4 pt-4 mt-3"
              }`}
            >
              <div
                className={`flex justify-between items-center mb-2  ${
                  index !== 0 && "pt-2"
                }`}
              >
                <input
                  required
                  className="border-2 p-2 rounded placeholder-gray-500"
                  type="text"
                  placeholder={`Key Feature Exp: "Model"`}
                  value={feature.name}
                  onChange={(event) => handleInputChange(index, event, "name")}
                />
                {index !== 0 && (
                  <button
                    className="px-3.5 py-1.5 rounded text-white hover:bg-red-700 bg-red-600 transition-all duration-300"
                    onClick={() => removeInput(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <textarea
                required
                className="border-2 p-2 rounded placeholder-gray-500 resize-none h-40"
                type="text"
                placeholder="Key Feature Description"
                value={feature.description}
                onChange={(event) =>
                  handleInputChange(index, event, "description")
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 text-right col-span-2 border-t py-4">
        <button
          type="submit"
          className={`text-center bg-indigo-700 rounded px-6 py-2.5 text-white font-semibold hover:bg-indigo-800 transition-all duration-300`}
        >
          Add
        </button>
      </div>
      <Notification
        addNotification={addNotification}
        setAddNotification={setAddNotification}
      />
    </form>
  );
}

export default ProfileAdd;
