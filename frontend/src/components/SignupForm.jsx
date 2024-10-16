import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };

    try {
      const response = await axios.post(
        "https://bookreview-backend-c6nn.onrender.com/api/v1/users/register",
        userData
      );
      if (response.data.data) {
        toast.success("User registered successfully");
        localStorage.setItem("Users", JSON.stringify(response.data.data));
        navigate("/");
        window.location.reload();
        reset();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Unexpected error occurred: ", err.message);
      }
    }
  };

  return (
    <div className=" w-full h-screen bg-[#202829] text-[#FFFFF0]">
      <div className="w-full max-w-md mx-auto bg-[#202829] text-[#FFFFF0] p-6 rounded-lg shadow-lg pt-12">
        <h2 className="text-2xl font-bold mb-6 mt-8 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              autoComplete="username"
              placeholder="Enter your name"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="user-email"
              placeholder="Enter your email"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-red-500">Password is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Submit
          </button>
          <p className=" flex justify-end">
            <span> Already Signup❓</span>
            <Link
              to="/login"
              className=" cursor-pointer underline text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
