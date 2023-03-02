import { useState, useEffect } from "react";
import axios from "axios";

interface UserData {
  userName: string;
  account: {
    balance: string;
  };
}

interface Props {
  userName: string;
}

const UserPage = ({ userName }: Props) => {
  console.log(userName);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("refreshToken");
        if (!token) {
          throw new Error("Refresh token not found");
        }
        const response = await axios.get(
          `http://localhost:5000/user/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userName]);

  return (
    <div>
      {userData ? (
        <>
          <h1>{userData.userName}</h1>
          <p>Balance: {userData.account.balance}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;

