import axios from "axios";
import React, { useEffect, useState } from "react";

function GetReview({ id }) {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const getAllReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/reviews/${id}`
        );

        const reviewData = response.data.data;
        setReview(reviewData);
        console.log(reviewData);
      } catch (error) {
        console.error("Error while fetching reviews", error);
      }
    };

    getAllReview();
  }, [id]);
  return (
    <div>
      {review?.map((card) => (
        <div
          key={card?._id}
          class="block max-w-sm p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className=" flex justify-around items-center gap-x-16">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ratings: {card.rating}
            </h5>
            <h5 className=" text-xl mb-2">Name: {card.user.name}</h5>
          </div>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {card.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GetReview;
