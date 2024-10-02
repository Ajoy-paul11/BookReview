import React, { useState, useEffect } from "react";
import Search from "./Search";
import Filter from "./Filter";
import Table from "./Table";
import axios from "axios";

function AdminDashboard() {
  const [obj, setObj] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://bookreview-backend-c6nn.onrender.com/api/v1/admin/?genre=${genre}&search=${search}`;
        const response = await axios.get(url);
        setObj(response.data);
      } catch (error) {
        console.log("Error occurred while getting data", error.message);
      }
    };

    getData();
  }, [genre, search]);

  return (
    <div className=" h-screen w-full bg-[#202829] text-[#FFFFF0] p-8">
      <div className=" max-w-[1000px] h-[90%] rounded-lg shadow-lg shadow-[#2f2628] mx-auto">
        <div className=" flex justify-between h-20 p-4 px-8 shadow-sm rounded-lg shadow-[#2f2628]">
          <div className=" font-bold text-2xl">
            Welcome <span className=" text-blue-700">Admin</span>
          </div>
          <div className=" w-1/3">
            {/* Search component */}
            <Search setSearch={(search) => setSearch(search)} />
          </div>
        </div>
        <div className=" w-full pt-6">
          <div className=" w-full flex flex-col items-center md:flex-row">
            <div className=" w-full md:w-2/3 pr-10">
              <Table data={obj ? obj : []} />
            </div>
            <div className=" w-full md:w-1/3 order-1">
              {/* Books filter component */}
              <Filter setGenre={(genre) => setGenre(genre)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
