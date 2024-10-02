import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://bookreview-backend-c6nn.onrender.com/api/v1/users/${id}`
        );
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Book not found</div>;

  return (
    <div className=" bg-[#202829] text-[#FFFFF0] h-screen">
      <div className=" container max-w-md mx-auto shadow-lg rounded-lg p-4 pt-12">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        <div className=" p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Name: {user.name}</h2>
          <p className=" mb-2">Email: {user.email}</p>
          <p className=" mb-2">Favorite Genre: {user.favorite_genre}</p>
        </div>
        <Link to={`/users/${id}`} className=" flex justify-end">
          <button
            type="submit"
            className=" py-2 px-4 m-2 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Update details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
