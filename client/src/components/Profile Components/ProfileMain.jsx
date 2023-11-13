import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileOption from "./ProfileOption";

function ProfileMain({setLogged}) {
  const [userInfo, setUserInfo] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/profile/${userId}`
        );
        setUserInfo(response.data.payload.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="mx-auto max-w-5xl mt-10">
      <div className="flex gap-6 justify-left items-center mb-10">
        <img
          className="rounded-full w-20"
          src="/images/profile.png"
          alt="profile image"
        />
        <div>
          <h1 className="text-gray-500">Hello,</h1>
          {Object.keys(userInfo).length !== 0 ? (
            <h1 className="font-semibold text-xl">{`${userInfo.name}`}</h1>
          ) : (
            <h1 className="font-semibold text-xl">Loading...</h1>
          )}
        </div>
      </div>
      <ProfileOption setLogged={setLogged} />
    </div>
  );
}

export default ProfileMain;
