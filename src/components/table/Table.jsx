import React from "react";
import styled from "styled-components";

const TableStyles = styled.div`
  overflow-x: auto;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background-color: #f7f7f8;

    th {
      padding: 16px 24px;
      font-weight: 600;
      font-size: 0.95rem;
      text-align: left;
      color: #333;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #fafafa;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
      }
    }

    td {
      padding: 14px 24px;
      font-size: 0.9rem;
      color: #555;
      vertical-align: middle;
    }
  }
`;

const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
