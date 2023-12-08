import { useState } from "react";

function CustomerInfo({
  name,
  setName,
  address,
  setAddress,
  telephone,
  setTelephone,
  email,
  setEmail,
  setComment,
  telLength,
  setTelLength,
}) {
  const [showMessage, setShowMessage] = useState(false);

  // Length check
  const handleInputChange = (event, setFunc, length = 0) => {
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
    <div className="row-span-2 rounded border p-6 bg-white">
      <h1 className="font-semibold text-xl pb-4 border-b">
        <span className="px-3 py-1 bg-red-100 rounded-full text-red-500  text-lg mr-4">
          1
        </span>
        Customer Information
      </h1>
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
          Address <span className="text-red-600">*</span>
        </label>
        <input
          required
          className="mt-1 border-2 p-2 rounded placeholder-gray-500 "
          type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => handleInputChange(event, setAddress, 100)}
        />
        {address.length > 0 && (
          <p className="text-red-600 text-sm mt-1">
            Max length is 100 characters!
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
      <div className="mt-4 flex flex-col">
        <label htmlFor="">
          E-mail <span className="text-red-600">*</span>
        </label>
        <input
          required
          className="mt-1 border-2 p-2 rounded placeholder-gray-500"
          type="email"
          placeholder="E-mail"
          onChange={(event) => handleInputChange(event, setEmail)}
        />
        {email.length > 0 && (
          <p className="text-red-600 text-sm mt-1">Email must contain @!</p>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="">
          Comment <span className="text-red-600">*</span>
        </label>
        <textarea
          required
          className="mt-1 border-2 p-2 rounded placeholder-gray-500 resize-none h-40"
          type="text"
          placeholder="Comment"
          onChange={(event) => handleInputChange(event, setComment)}
        />
      </div>
    </div>
  );
}

export default CustomerInfo;
