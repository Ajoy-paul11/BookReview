import React from "react";

function Table({ data }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Genre
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item) => (
            <tr className="bg-[#202829] text-[#FFFFF0]">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.title}
              </th>
              <td className="px-6 py-4">{item.author}</td>
              <td className="px-6 py-4">{item.genre}</td>
            </tr>
          ))}
          {/* <tr class="bg-[#202829] text-[#FFFFF0]">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4">Laptop</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
