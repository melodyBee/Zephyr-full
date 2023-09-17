import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../Context/context";

export default function UserInfo() {
  axios.get(`http://localhost:8765/api/users/getuserby/`);
  const { dispatch } = useContext(UserContext);

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  return (
    <>
      <div className="d-flex rounded justify-content-center align-item-center m-2 p-2">
        <img src="#" alt="Profile" />
        {/* I need the name jsut after it and take users location and city */}
        {/* We need a chat option too but it's not that important */}
      </div>
      <button className="btn btn-outline-dark col-md-4" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
