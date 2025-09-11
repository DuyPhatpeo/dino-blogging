import React, { useState } from "react";
import styled from "styled-components";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { MOCK_POSTS } from "@/data/posts";
import { Eye, Edit, Trash2 } from "lucide-react";

const PostManageStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h1.dashboard-heading {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 32px;
    color: #0ea5e9;
  }
`;
const POSTS_PER_PAGE = 10;

// Hàm helper trả màu theo trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "APPROVED":
      return "#22c55e"; // xanh
    case "PENDING":
      return "#facc15"; // vàng
    case "REJECTED":
      return "#ef4444"; // đỏ
    default:
      return "#6b7280"; // xám
  }
};

export default function PostManage() {
  const [currentPage, setCurrentPage] = useState(1);

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
    {
      key: "status",
      render: (val) => (
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor: getStatusColor(val),
            fontSize: "0.8rem",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {val}
        </span>
      ),
    },
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
    <PostManageStyles>
      <h1 className="dashboard-heading">Manage post</h1>

      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Post Info</th>
            <th>ID</th>
            <th>Category</th>
            <th>Status</th>
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
        total={Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE)}
        current={currentPage}
        onChange={setCurrentPage}
        pageSize={POSTS_PER_PAGE}
        totalItems={MOCK_POSTS.length}
      />
    </PostManageStyles>
  );
}
