import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AddBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      image_url: data.image_url,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/add",
        userData
      );
      if (response.data.data) {
        toast.success("Book added successfully");
        reset();
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <div className=" w-full h-screen bg-[#202829] text-[#FFFFF0]">
      <div className="w-full max-w-md mx-auto bg-[#202829] text-[#FFFFF0] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 mt-8 text-center">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className=" text-red-500">Title is required</span>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author name"
              required
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("author", { required: true })}
            />
            {errors.author && (
              <span className=" text-red-500">Author is required</span>
            )}
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium mb-1">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent"
              {...register("genre", { required: true })}
            >
              <option value="">Select a genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Fantasy</option>
              <option value="self-help">Fantasy</option>
              <option value="other">Other</option>
            </select>
            {errors.genre && (
              <span className=" text-red-500">Genre is required</span>
            )}
          </div>
          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium mb-1"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              placeholder="Enter image URL"
              className="w-full p-2 bg-[#202829] text-[#FFFFF0] border border-[#FFFFF0] border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:border-transparent placeholder-[#FFFFF0] placeholder-opacity-50"
              {...register("image_url", { required: true })}
            />
            {errors.image_url && (
              <span className=" text-red-500">Image URL is required</span>
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

export default AddBookForm;
