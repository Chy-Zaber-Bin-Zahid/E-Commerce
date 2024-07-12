import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function LoginRegister({
  setRegNotification,
  setLogNotification,
  setLogged,
  setAccountId,
  setCartNumber,
  setAdminCheck,
}) {
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [exist, setExist] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [telLength, setTelLength] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  // Length check
  const handleInputChange = (event, setFunc, length = 0) => {
    setExist(false);
    setPassCheck(false);
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

  // Data send to backend
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Register
    if (location.pathname === "/register") {
      try {
        const result = await axios.post(
          "https://smart-tech-ec8z.onrender.com/api/user/register",
          { name, email, password, telephone }
        );
        // console.log(result.data);
        setRegNotification(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2000 milliseconds (2 second)
      } catch (err) {
        // User existing check by email
        if (err.response) {
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
      }
    }

    // Login
    else {
      try {
        const result = await axios.post(
          "https://smart-tech-ec8z.onrender.com/api/user/login",
          { email, password }
        );

        const data = result.data.payload.user;
        if (data.isBanned === false) {
          setLogNotification(true);
          setAccountId(data._id);
          if (data.isAdmin) {
            setAdminCheck(true);
          } else {
            setAdminCheck(false);
          }
          setTimeout(() => {
            navigate(`/profile/${result.data.payload.user._id}`);
            setLogged(true);
          }, 2000); // 2000 milliseconds (2 second)
          setTimeout(() => {
            if (result.data.payload.sum) {
              setCartNumber(result.data.payload.sum);
            }
          }, 2000);
          setIsBanned(false);
        } else {
          setIsBanned(true);
        }
      } catch (err) {
        const errorMessage = err.response.data.error;
        if (errorMessage === "User with this email does not exists") {
          setExist(true);
        } else if (errorMessage === "Wrong password") {
          setPassCheck(true);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="mx-auto py-10">
        <div className="w-96 ">
          <h1 className="font-bold text-2xl">
            {location.pathname !== "/register"
              ? "Account Login"
              : "Register Account"}
          </h1>
          {isBanned && (
            <h1 className="border-2 border-red-600 text-red-600 p-2 rounded mt-4 text-center font-semibold">
              This Account Is Banned!
            </h1>
          )}
          {location.pathname === "/register" && (
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
          )}
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
                {location.pathname === "/register" &&
                  (exist === false
                    ? "Email must contain @!"
                    : "This email already exists!")}
                {location.pathname === "/login" &&
                  (exist === false
                    ? "Email must contain @!"
                    : "This email does not exist!")}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              required
              className={`mt-1 border-2 p-2 rounded placeholder-gray-500 ${
                passCheck !== false && "border-red-600"
              }`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => handleInputChange(event, setPassword, 40)}
            />
            {password.length > 0 && (
              <p className="text-red-600 text-sm mt-1">
                {location.pathname === "/register" &&
                  "Max length is 40 characters!"}
                {location.pathname === "/login" &&
                  (passCheck === false
                    ? "Max length is 40 characters!"
                    : "Wrong password!")}
              </p>
            )}
          </div>
          {location.pathname === "/register" && (
            <>
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
            </>
          )}
          <button
            type="submit"
            className="mt-4 text-center w-full bg-indigo-700 rounded py-2.5 text-white font-semibold hover:bg-indigo-800 transition-all duration-300"
          >
            {location.pathname !== "/register" ? "Login" : "Continue"}
          </button>
          <p className="mt-4 text-center text-gray-500">
            {location.pathname !== "/register"
              ? "Don't Have an account?"
              : "Already have an account?"}
          </p>
          {location.pathname !== "/register" ? (
            <Link
              to="/register"
              className="mt-4 text-center w-full rounded py-2.5 text-indigo-700 border-2 border-indigo-700 font-semibold hover:bg-indigo-700 hover:text-white transition-all duration-500 inline-block"
            >
              Create Your Account
            </Link>
          ) : (
            <p className="mt-2 ">
              If you already have an account with us, please login at the{" "}
              <Link to="/login" className="text-red-600 hover:underline">
                login page
              </Link>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginRegister;
