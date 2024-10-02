import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext.jsx";
import Logout from "./Logout.jsx";

export default function Header() {
  const { authUser } = useAuth();

  return (
    <header className="bg-[#202829] text-[#FFFFF0] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookReviews
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              {authUser && (
                <Link to={`/profile/${authUser?._id}`}>Profile</Link>
              )}
            </li>
            <li>{authUser ? <Logout /> : <Link to="/login">Login</Link>}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
