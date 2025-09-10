import React from "react";
import { useDropdown } from "./dropdown-context";

const Search = ({ placeholder = "Search...", ...props }) => {
  const { setSearchTerm } = useDropdown();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 outline-none w-full border border-gray-200 rounded"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default Search;
