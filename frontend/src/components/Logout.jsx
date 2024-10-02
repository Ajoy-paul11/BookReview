import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Users");
    window.location.reload();
    navigate("/");
  };

  return (
    <div>
      <button className=" cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
