import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = ({ value, children }) => {
  const { setSelected, setShow, searchTerm } = useDropdown();

  // Lọc theo searchTerm (nếu có)
  if (searchTerm && !value.toLowerCase().includes(searchTerm.toLowerCase())) {
    return null;
  }

  const handleClick = () => {
    setSelected(value); // cập nhật option đã chọn
    setShow(false); // đóng dropdown
  };

  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
      onClick={handleClick}
    >
      {children || value}
    </div>
  );
};

export default Option;
