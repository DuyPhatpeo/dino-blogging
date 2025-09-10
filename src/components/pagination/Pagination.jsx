import React from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .pagination {
    &-list {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &-prev,
    &-next,
    &-item {
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.2s ease;
      color: ${(props) => props.theme.gray80 || "#555"};

      &:hover {
        background-color: ${(props) => props.theme.secondary || "#00b894"};
        color: #fff;
      }
    }

    &-item.is-current {
      background-color: ${(props) => props.theme.secondary || "#00b894"};
      color: #fff;
    }

    &-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
`;

const Pagination = ({ current = 2, total = 5 }) => {
  return (
    <PaginationStyles>
      <span
        className={`pagination-prev ${
          current === 1 ? "pagination-disabled" : ""
        }`}
      >
        <ChevronLeft size={20} />
      </span>
      <ul className="pagination-list">
        <li className="pagination-item">1</li>
        <li className={`pagination-item ${current === 2 ? "is-current" : ""}`}>
          2
        </li>
        <li className="pagination-item">...</li>
        <li className="pagination-item">3</li>
        <li className="pagination-item">4</li>
        <li className="pagination-item">5</li>
      </ul>
      <span
        className={`pagination-next ${
          current === total ? "pagination-disabled" : ""
        }`}
      >
        <ChevronRight size={20} />
      </span>
    </PaginationStyles>
  );
};

export default Pagination;
