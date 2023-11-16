import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Notification from "../Notification";

function ProfilePassChange({ setUpNotification, upNotification }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassCheck, setOldPassCheck] = useState(false);
  const [newPassCheck, setNewPassCheck] = useState(false);
  const [confirmPassCheck, setConfirmPassCheck] = useState(false);
  const [passUpdate, setPassUpdate] = useState(false);
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password Sent to Backend
    try {
      const result = await axios.post(
        "http://localhost:3001/api/user/changePass",
        {
          userId,
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );
      setUpNotification(true);
      setPassUpdate(true);
    } catch (err) {
      const errorMessage = err.response.data.error;
      if (errorMessage === "Wrong password") {
        setOldPassCheck(true);
      } else if (errorMessage === "Same password") {
        setNewPassCheck(true);
      } else {
        setConfirmPassCheck(true);
      }
    }
  };

  // Length check
  const handleInputChange = (event, setFunc, length = 0) => {
    setOldPassCheck(false);
    setNewPassCheck(false);
    setConfirmPassCheck(false);
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

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl text-blue-700">Change Password</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            Old Password <span className="text-red-600">*</span>
          </label>
          <input
            required
            className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
              oldPassCheck !== false && "border-red-600"
            }`}
            type="password"
            placeholder="Password"
            value={oldPassword}
            onChange={(event) => handleInputChange(event, setOldPassword, 40)}
          />
          {oldPassword.length > 0 && (
            <p className="text-red-600 text-sm mt-1">
              {oldPassCheck === false
                ? "Type your previous password!"
                : "Wrong password!"}
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            New Password <span className="text-red-600">*</span>
          </label>
          <input
            required
            className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
              newPassCheck !== false && "border-red-600"
            }`}
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(event) => handleInputChange(event, setNewPassword, 40)}
          />
          {newPassword.length > 0 && (
            <p className="text-red-600 text-sm mt-1">
              {newPassCheck === false
                ? "Max length is 40 characters!"
                : "Same password!"}
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <input
            required
            className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
              confirmPassCheck !== false && "border-red-600"
            }`}
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(event) =>
              handleInputChange(event, setConfirmPassword, 40)
            }
          />
          {confirmPassword.length > 0 && (
            <p className="text-red-600 text-sm mt-1">
              {confirmPassCheck === false
                ? "Retype the password typed in New Password!"
                : "Passwords do not match!"}
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
        passUpdate={passUpdate}
      />
    </div>
  );
}

export default ProfilePassChange;
