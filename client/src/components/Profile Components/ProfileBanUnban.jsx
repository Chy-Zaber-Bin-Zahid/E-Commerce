import axios from "axios";
import { useEffect, useState } from "react";
import ProfileTable from "./ProfileTable";

function ProfileBanUnban() {
  const [userInfo, setUserInfo] = useState([]);
  const [storeValue, setStoreValue] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setStoreValue(e.target.value);
  };

  useEffect(() => {
    const handelUserFetch = async () => {
      try {
        const result = await axios.get("https://smart-tech-ec8z.onrender.com/api/user/all", {
          params: {
            fields: ["name", "email", "isAdmin", "isBanned"],
          },
        });
        const data = result.data.payload.user;
        if (storeValue.length !== 0) {
          const userWithInputInEmail = data.filter((user) =>
            user.email.includes(storeValue)
          );
          setUserInfo(userWithInputInEmail);
        } else {
          setUserInfo(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handelUserFetch();
  }, [storeValue]);

  // Ban Unban Authorize
  useEffect(() => {
    const handelStatus = async () => {
      if (status !== "") {
        try {
          const result = await axios.patch(
            "https://smart-tech-ec8z.onrender.com/api/user/status",
            { status, userId }
          );
          const updatedUser = result.data.payload.user;
          setUserInfo((prevUsers) =>
            prevUsers.map((user) =>
              user._id === updatedUser._id ? updatedUser : user
            )
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    handelStatus();
  }, [status]);

  const handleClick = (id, status) => {
    setUserId(id);
    if (status === "Ban") {
      setStatus("Ban");
    } else if (status === "Unban") {
      setStatus("Unban");
    } else if (status === "Unauthorize") {
      setStatus("Unauthorize");
    } else {
      setStatus("Authorize");
    }
  };

  return (
    <div>
      <input
        className="py-2 px-4 w-full rounded focus:outline-none bg-slate-50 border mt-6 mb-2"
        placeholder="Search by email"
        type="text"
        list="options"
        onChange={(e) => handleChange(e)}
      />

      <ProfileTable
        userInfo={userInfo}
        handleClick={handleClick}
        storeValue={storeValue}
      />
    </div>
  );
}

export default ProfileBanUnban;
