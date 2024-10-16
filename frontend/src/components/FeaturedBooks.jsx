import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const response = await axios.get(
          `https://bookreview-backend-c6nn.onrender.com/api/v1/books/?page=${page}`
        );
        const bookInfo = response.data.data;
        setBooks(bookInfo.books);
        setTotalPage(Math.ceil(bookInfo.totalBook / 3));
        setLoading(false);
        toast.success("Books fetched successfully");
      } catch (error) {
        setError("Error while fetching books");
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        }
      }
    };
    getBooksData();
  }, [page]);

  const changePage = (nextPage) => {
    setPage(nextPage + 1);
  };

  if (loading)
    return <div className=" text-center mt-[32px] text-xl">Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!books) return <div>Books not found</div>;

  return (
    <div className=" pb-4">
      <h2 className="text-2xl font-semibold mb-4">Featured Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="bg-[#F5F5DC] p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-[#1B1212]">
              Book Name: {book.title}
            </h3>
            <p className="text-[#1B1212] font-serif">Author: {book.author}</p>
          </Link>
        ))}
      </div>
      <div className=" w-32 h-8 mx-auto absolute left-1/2 mt-8">
        {totalPage > 0 &&
          [...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index)}
              className={` px-3 py-1 rounded-xl text-sm font-semibold ${
                page === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
