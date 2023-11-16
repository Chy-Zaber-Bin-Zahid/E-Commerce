import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Notification from "../Notification";

function ProfileEdit({ setUserInfo, upNotification, setUpNotification }) {
  const [exist, setExist] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [telLength, setTelLength] = useState(false);
  const [telephone, setTelephone] = useState("");
  const { userId } = useParams();

  // Data send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/api/user/change", {
        email,
        name,
        telephone,
        userId,
      });
      setUserInfo(result.data.payload.user);
      setUpNotification(true);
    } catch (err) {
      const errorMessage = err.response.data.error;
      if (errorMessage === "User with this email already exists") {
        setExist(true);
      } else if (errorMessage === "Telephone is less than 11") {
        setTelLength(true);
      } else {
        setExist(true);
        setTelLength(true);
      }
    }
  };

  // Length check
  const handleInputChange = (event, setFunc, length = 0) => {
    setExist(false);
    const inputValue = event.target.value;
    if (length !== 0) {
      // Limit the character count to 30/40(length)
      if (inputValue.length <= length) {
        setFunc(inputValue);
      } else {
        setFunc(inputValue.slice(0, length));
      }
    } else {
      setFunc(inputValue);
    }
  };

  // Telephone Number Check
  const handleTelephoneChange = (event) => {
    setTelLength(false);
    const inputValue = event.target.value;
    const numbersOnly = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setTelephone(numbersOnly);
    } else {
      setTelephone(numbersOnly.slice(0, 11));
    }
  };

  const handleTelephoneFocus = () => {
    setShowMessage(true);
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl text-blue-700">My Account Information</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            required
            className="mt-1 border-2 p-2 rounded placeholder-gray-500 "
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => handleInputChange(event, setName, 30)}
          />
          {name.length > 0 && (
            <p className="text-red-600 text-sm mt-1">
              Max length is 30 characters!
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            E-mail <span className="text-red-600">*</span>
          </label>
          <input
            required
            className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
              exist !== false && "border-red-600"
            }`}
            type="email"
            placeholder="E-mail"
            onChange={(event) => handleInputChange(event, setEmail)}
          />
          {email.length > 0 && (
            <p className="text-red-600 text-sm mt-1">
              {exist === false
                ? "Email must contain @!"
                : "This email already exists!"}
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            Telephone <span className="text-red-600">*</span>
          </label>
          <input
            required
            className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
              telLength !== false && "border-red-600"
            }`}
            type="tel"
            placeholder="Telephone"
            value={telephone}
            onChange={handleTelephoneChange}
            onFocus={handleTelephoneFocus}
          />
          {showMessage && (
            <p className="text-red-600 text-sm mt-1">
              {telLength !== true
                ? "Only numbers can be typed, and the length is 11 (Fixed)!"
                : "Telephone must contain 11 number!"}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 text-center w-full bg-indigo-700 rounded py-2.5 text-white font-semibold hover:bg-indigo-800 transition-all duration-300 max-w-xs"
        >
          Continue
        </button>
      </form>
      <Notification
        upNotification={upNotification}
        setUpNotification={setUpNotification}
      />
    </div>
  );
}

export default ProfileEdit;
