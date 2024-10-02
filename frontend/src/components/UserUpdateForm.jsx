import React, { useState, useEffect } from "react";
import { useAuth } from "../userContext/AuthContext.jsx";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function UserUpdateForm() {
  const { authUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.name);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setName(authUser.name);
  }, [authUser]);

  const onSubmit = async (data) => {
    const userData = {
      name: name,
      favorite_genre: data.favorite_genre,
    };

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/${id}`,
        userData
      );
      if (response.data.data) {
        toast.success("User updated successfully");
        localStorage.setItem("Users", JSON.stringify(response.data.data));
        navigate("/");
        window.location.reload();
        reset();
      }
    } catch (err) {
      console.error(err);
      console.log("Error while login the user: ", err.message);
    }
  };

  return (
    <div className=" w-full h-screen bg-[#202829] text-[#FFFFF0]">
      <div className="w-full max-w-md mx-auto bg-[#202829] text-[#FFFFF0] p-6 rounded-lg shadow-lg pt-12">
        <h2 className="text-2xl font-bold mb-6 mt-8 text-center">Login</h2>
        <Link to={`/profile/${authUser?._id}`} className=" flex justify-end">
          <button
            type="submit"
            className=" py-2 px-4 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Back
          </button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              placeholder="Enter your name"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
            />
            {errors.name && (
              <span className=" text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Favorite Genre
            </label>
            <input
              type="text"
              id="favorite_genre"
              name="favorite_genre"
              autoComplete="favorite_genre"
              placeholder="Enter your favorite genre"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("favorite_genre", { required: true })}
            />
            {errors.favorite_genre && (
              <span className=" text-red-500">Favorite genre is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserUpdateForm;
