import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext";
import toast from "react-hot-toast";

function ReviewForm() {
  const { id } = useParams();
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      rating: data.rating,
      content: data.content,
      bookId: id,
      userId: authUser?._id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/reviews",
        reviewData
      );
      if (response.data.data) {
        toast.success("Review added successfully");
        navigate(`/book/${id}`);
        reset();
      }
    } catch (err) {
      console.log("Error while login the user: ", err.message);
    }
  };

  return (
    <div className=" w-full h-screen bg-[#202829] text-[#FFFFF0]">
      <div className="w-full max-w-md mx-auto bg-[#202829] text-[#FFFFF0] p-6 rounded-lg shadow-lg pt-6">
        <h2 className="text-2xl font-bold mb-6 mt-8 text-center">Review</h2>
        <Link to={`/book/${id}`} className=" flex justify-end">
          <button
            type="submit"
            className=" py-2 px-4 m-2 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Back
          </button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              autoComplete="rating"
              placeholder="Enter your rating"
              min={1}
              max={5}
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("rating", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-500">Ratings is required</span>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              rows={8}
              placeholder="Share your view"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("content", { required: true })}
            ></textarea>
            {errors.email && (
              <span className=" text-red-500">Content is required</span>
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

export default ReviewForm;
