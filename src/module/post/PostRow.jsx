import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ActionButton } from "@components/table/Table";

const PostRow = ({ post }) => {
  return (
    <tr>
      <td className="image-cell">
        <img src={post.image} alt={post.title} className="table-image" />
      </td>
      <td>
        <div className="post-info">
          <h3>{post.title}</h3>
          <time>{post.date}</time>
        </div>
      </td>
      <td>
        <span className="id-badge">#{post.id}</span>
      </td>
      <td>
        <span className="badge">{post.category}</span>
      </td>
      <td>{post.author}</td>
      <td>
        <div className="actions">
          <ActionButton variant="view">
            <Eye size={18} />
          </ActionButton>
          <ActionButton variant="edit">
            <Edit size={18} />
          </ActionButton>
          <ActionButton variant="delete">
            <Trash2 size={18} />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
};

export default PostRow;
