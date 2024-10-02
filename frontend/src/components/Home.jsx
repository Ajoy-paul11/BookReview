import React, { useEffect } from "react";
import FeaturedBooks from "./FeaturedBooks.jsx";

function Home() {
  return (
    <div className=" max-w-screen-2xl container h-screen mx-auto md:px-20 px-4 bg-[#202829] text-[#FFFFF0]">
      <div className="">
        <div className=" pt-24">
          <h1 className="text-5xl text-center font-bold mb-6">
            Welcome to BookReviews
          </h1>
          <div className=" pt-12 pb-4">
            <FeaturedBooks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
