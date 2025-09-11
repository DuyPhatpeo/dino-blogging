import React from "react";
import styled from "styled-components";
import { useDropdown } from "./dropdown-context";

const SearchWrapper = styled.div`
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const Search = ({ placeholder = "Search..." }) => {
  const { setSearchTerm } = useDropdown();

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default Search;
