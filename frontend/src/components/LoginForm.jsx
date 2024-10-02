import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
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
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userData
      );
      if (response.data.data) {
        toast.success("User Logged in successfully");
        localStorage.setItem("Users", JSON.stringify(response.data.data));
        navigate("/");
        window.location.reload();
        reset();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error("Login error:", err.response.data.message);
        console.error("Login error:", err.response.data.message);
      } else {
        console.error("An unexpected error occurred:", err.message);
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
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="password"
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
              autoComplete="password"
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
            <span> Don't have an account❓</span>
            <Link
              to="/signup"
              className=" cursor-pointer underline text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
