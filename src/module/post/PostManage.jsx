import React, { useState } from "react";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { MOCK_POSTS } from "@/data/posts";
import { Eye, Edit, Trash2 } from "lucide-react";

const POSTS_PER_PAGE = 10;

export default function PostManage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE);

  const paginatedPosts = MOCK_POSTS.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const columns = [
    {
      key: "image",
      render: (val) => <img src={val} alt="" className="table-image" />,
      className: "image-cell",
    },
    {
      key: "title",
      render: (val, item) => (
        <div className="post-info">
          <h3>{val}</h3>
          <time>{item.date}</time>
        </div>
      ),
    },
    { key: "id", render: (val) => <span className="id-badge">#{val}</span> },
    { key: "category", render: (val) => <span className="badge">{val}</span> },
    { key: "author" },
  ];

  const actions = [
    {
      type: "view",
      icon: <Eye size={18} />,
      onClick: (item) => console.log("View", item),
    },
    {
      type: "edit",
      icon: <Edit size={18} />,
      onClick: (item) => console.log("Edit", item),
    },
    {
      type: "delete",
      icon: <Trash2 size={18} />,
      onClick: (item) => console.log("Delete", item),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Posts</h1>

      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Post Info</th>
            <th>ID</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <Table.Row
              key={post.id}
              item={post}
              columns={columns}
              actions={actions}
            />
          ))}
        </tbody>
      </Table>

      <Pagination
        total={totalPages}
        current={currentPage}
        onChange={setCurrentPage}
        pageSize={POSTS_PER_PAGE}
        totalItems={MOCK_POSTS.length}
      />
    </div>
  );
}
