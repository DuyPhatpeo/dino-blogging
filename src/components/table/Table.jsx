import React from "react";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";

// Table Wrapper
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${(props) => props.theme.radius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background: #fff;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 720px;
  }

  thead {
    background: ${(props) => props.theme.colors.grayLight};
    position: sticky;
    top: 0;
    z-index: 5;

    th {
      padding: 12px 16px;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: left;
      color: ${(props) => props.theme.colors.text};
      border-bottom: 1px solid ${(props) => props.theme.colors.border};
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background: ${(props) => props.theme.colors.background};
      }
      &:hover {
        background: ${(props) => props.theme.colors.grayLight};
      }
    }

    td {
      padding: 12px 16px;
      font-size: ${(props) => props.theme.fontSize.sm};
      color: ${(props) => props.theme.colors.grayDark};
      vertical-align: middle;

      &.image-cell {
        width: 200px;
      }

      &.image-cell img {
        width: 150px;
        height: auto;
        object-fit: cover;
        border-radius: ${(props) => props.theme.radius.sm};
        border: 1px solid ${(props) => props.theme.colors.border};
        display: block;
        margin: 0 auto;
      }
    }

    .actions {
      display: flex;
      gap: 6px;
    }
  }
`;

// Action Button
const ActionButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radius.sm};
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: background 0.2s;

  background: ${({ theme, variant }) => {
    switch (variant) {
      case "view":
        return theme.colors.detail;
      case "edit":
        return theme.colors.edit;
      case "delete":
        return theme.colors.delete;
      default:
        return theme.colors.primary;
    }
  }};

  &:hover {
    opacity: 0.9;
  }

  svg {
    stroke: #fff;
    width: 16px;
    height: 16px;
  }
`;

// Main Table component
const Table = ({ children }) => (
  <TableWrapper>
    <table>{children}</table>
  </TableWrapper>
);

// Sub-component: DataRow / PostRow
Table.Row = ({ item, columns, actions }) => (
  <tr>
    {columns.map((col) => (
      <td key={col.key} className={col.className || ""}>
        {col.render ? col.render(item[col.key], item) : item[col.key]}
      </td>
    ))}

    {actions && actions.length > 0 && (
      <td>
        <div className="actions">
          {actions.map((action) => (
            <ActionButton
              key={action.type}
              variant={action.type}
              onClick={() => action.onClick(item)}
            >
              {action.icon}
            </ActionButton>
          ))}
        </div>
      </td>
    )}
  </tr>
);

export { ActionButton };
export default Table;
