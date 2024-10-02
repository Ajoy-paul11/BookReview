import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import GetReview from "./GetReview";

function SingleBookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/books/${id}`
        );
        setBook(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="w-full min-h-screen bg-[#202829] text-[#FFFFF0] p-6 rounded shadow flex flex-col md:flex-row justify-center pt-12">
      <div className=" md:w-1/2 h-[400px] p-6 flex justify-center">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-[350px] rounded-xl mb-4"
        />
      </div>
      <div className="md:w-1/2 flex justify-start items-start gap-4 flex-col p-6">
        <h2 className="text-3xl font-semibold mb-4">{book.title}</h2>
        <p className="text-xl mb-2">Author: {book.author}</p>
        <p className="mb-2">Genre: {book.genre}</p>
        <Link to={`/reviews/${id}`} className=" flex justify-end">
          <button
            type="submit"
            className=" py-2 px-4 bg-[#FFFFF0] text-[#202829] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFFFF0] focus:ring-opacity-50 transition-colors duration-200"
          >
            Give Review
          </button>
        </Link>
        <GetReview id={id} />
      </div>
    </div>
  );
}

export default SingleBookDetails;
