import React from "react";
import { ActionButton } from "@/components/Table/Table";

const TableRow = ({ item, columns, actions }) => {
  return (
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
};

export default TableRow;
