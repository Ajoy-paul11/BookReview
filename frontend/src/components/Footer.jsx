import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#202829] text-[#FFFFF0] p-4 ">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} BookReviews. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
