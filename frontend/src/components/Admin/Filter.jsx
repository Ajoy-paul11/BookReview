import React, { useState } from "react";

function Filter({ setGenre }) {
  const type = [
    "fiction",
    "non-fiction",
    "mystery",
    "sci-fi",
    "fantasy",
    "romance",
    "self-help",
    "other",
  ];
  const [checkedValue, setCheckedValue] = useState("");
  const handleFilter = ({ currentTarget: input }) => {
    if (input.checked) {
      setCheckedValue(input.value);
      setGenre(input.value);
    } else {
      setCheckedValue("");
      setGenre("");
    }
  };
  return (
    <div>
      <h2 className=" font-semibold text-xl">Filter By Department: </h2>
      <div className=" grid grid-cols-3 gap-x-2">
        {type.map((item) => (
          <div key={item} className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              value={item}
              checked={checkedValue === item}
              onChange={handleFilter}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
