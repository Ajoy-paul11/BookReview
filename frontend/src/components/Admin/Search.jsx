import React from "react";

function Search({ setSearch }) {
  return (
    <input
      type="text"
      className=" h-10 w-[100%] rounded-md text-lg p-2 outline-none text-gray-800"
      placeholder="Search..."
      // onChange={(e) => setSearch(e.target.value)}
      onChange={({ currentTarget: input }) => setSearch(input.value)}
    />
  );
}

export default Search;
