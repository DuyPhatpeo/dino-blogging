import React from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationStyles = styled.div`
  margin-top: 24px;

  .pagination-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pagination-info {
    font-size: 14px;
    color: ${(props) => props.theme.colors.grayDark};
    text-align: right;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

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
      width: 42px;
      height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      border-radius: ${(props) => props.theme.radius.full};
      transition: all 0.25s ease;
      color: ${(props) => props.theme.colors.grayDark};
      user-select: none;

      &:hover {
        background: linear-gradient(
          135deg,
          ${(props) => props.theme.colors.secondary},
          ${(props) => props.theme.colors.primary}
        );
        color: #fff;
        transform: scale(1.05);
        box-shadow: ${(props) => props.theme.shadow.button};
      }
    }

    &-item.is-current {
      background: linear-gradient(
        135deg,
        ${(props) => props.theme.colors.secondary},
        ${(props) => props.theme.colors.primary}
      );
      color: #fff;
      box-shadow: ${(props) => props.theme.shadow.card};
      transform: scale(1.05);
    }

    &-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
`;

const Pagination = ({
  current = 1,
  total = 1,
  onChange,
  totalItems = 0,
  pageSize = 10,
}) => {
  const createPageNumbers = () => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  const handleClick = (page) => {
    if (page !== "..." && page !== current && onChange) {
      onChange(page);
    }
  };

  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, totalItems);

  return (
    <PaginationStyles>
      <div className="pagination-container">
        <div className="pagination-info">
          Showing <b>{startItem}</b>–<b>{endItem}</b> of <b>{totalItems}</b>{" "}
          items
        </div>

        <div className="pagination-controls">
          <span
            className={`pagination-prev ${
              current === 1 ? "pagination-disabled" : ""
            }`}
            onClick={() => current > 1 && onChange?.(current - 1)}
          >
            <ChevronLeft size={20} />
          </span>

          <ul className="pagination-list">
            {createPageNumbers().map((page, idx) => (
              <li
                key={idx}
                className={`pagination-item ${
                  page === current ? "is-current" : ""
                } ${page === "..." ? "pointer-events-none text-gray-400" : ""}`}
                onClick={() => handleClick(page)}
              >
                {page}
              </li>
            ))}
          </ul>

          <span
            className={`pagination-next ${
              current === total ? "pagination-disabled" : ""
            }`}
            onClick={() => current < total && onChange?.(current + 1)}
          >
            <ChevronRight size={20} />
          </span>
        </div>
      </div>
    </PaginationStyles>
  );
};

export default Pagination;
