import React, { useState } from "react";
import styled from "styled-components";
import Table from "@components/Table/Table";
import Pagination from "@components/Pagination/Pagination";
import { Eye, Edit, Trash2, Flame, Plus } from "lucide-react";
import { postStatusLabel, postStatusStyle } from "@utils/constants";
import LoadingSpinner from "@components/Loading/LoadingSpinner";
import Button from "@components/Button/Button";
import InputSearch from "@components/Input/InputSearch";
import { useNavigate } from "react-router-dom";
import { usePosts } from "@hooks/usePosts";

const PostManageStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  h1.dashboard-heading {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0ea5e9;
    margin: 0;
  }

  .table-image {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .id-badge {
    display: inline-block;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clickable-status {
    cursor: pointer;
  }

  .no-data {
    text-align: center;
    padding: 20px;
    color: #6b7280;
    font-style: italic;
  }

  .post-info h3 {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0 0 4px 0;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: 20px;
    h1.dashboard-heading {
      font-size: 1.5rem;
    }
    .table-image {
      width: 100px;
      height: 70px;
    }
    table th:nth-child(3),
    table td:nth-child(3),
    table th:nth-child(5),
    table td:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    h1.dashboard-heading {
      font-size: 1.3rem;
    }
    table {
      font-size: 0.85rem;
    }
    table th:nth-child(4),
    table td:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .table-image {
      width: 80px;
      height: 60px;
    }
    table {
      font-size: 0.75rem;
    }
    table th:nth-child(6),
    table td:nth-child(6),
    table th:nth-child(7),
    table td:nth-child(7) {
      display: none;
    }
  }
`;

const POSTS_PER_PAGE = 10;

export default function PostManage() {
  const navigate = useNavigate();
  const { posts, loading, toggleHot, toggleStatus } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter
  const filteredPosts = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const columns = [
    {
      key: "image",
      render: (val) => (
        <img src={val || "/fallback.jpg"} alt="" className="table-image" />
      ),
    },
    {
      key: "title",
      render: (val, item) => (
        <div className="post-info">
          <h3>{val}</h3>
          <time style={{ fontSize: "0.85rem", color: "#6b7280" }}>
            {item.createdAt}
          </time>
        </div>
      ),
    },
    {
      key: "id",
      render: (val) => {
        const shortId = val.length > 10 ? val.slice(0, 10) + "..." : val;
        return <span className="id-badge">#{shortId}</span>;
      },
    },
    {
      key: "category",
      render: (val) =>
        val.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {val.map((c, index) => (
              <span
                key={c.id + index}
                style={{
                  background: "#f3f4f6",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                }}
              >
                {c.name}
              </span>
            ))}
          </div>
        ) : (
          <span>—</span>
        ),
    },
    {
      key: "author",
      render: (val, item) => (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {item.authorAvatar && (
            <img
              src={item.authorAvatar}
              alt={val}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <span>{val}</span>
        </div>
      ),
    },
    {
      key: "status",
      render: (val, item) => {
        const style = postStatusStyle[val] || {
          bg: "#e5e7eb",
          color: "#374151",
        };
        return (
          <span
            className="clickable-status"
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "6px",
              backgroundColor: style.bg,
              color: style.color,
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={() => toggleStatus(item.id, val)}
            title="Click to change status"
          >
            {postStatusLabel[val] || "UNKNOWN"}
          </span>
        );
      },
    },
    {
      key: "hot",
      render: (val, item) => (
        <span
          onClick={() => toggleHot(item.id, val)}
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
            borderRadius: "6px",
            backgroundColor: val ? "#fee2e2" : "#f3f4f6",
          }}
          title={val ? "Hot post" : "Not hot"}
        >
          <Flame
            size={18}
            style={{
              color: val ? "#b91c1c" : "#9ca3af",
            }}
          />
        </span>
      ),
    },
  ];

  const actions = [
    {
      type: "view",
      icon: <Eye size={18} />,
      onClick: (item) => navigate(`/manage/view-post/${item.id}`),
    },
    {
      type: "edit",
      icon: <Edit size={18} />,
      onClick: (item) => navigate(`/manage/update-post/${item.id}`),
    },
    {
      type: "delete",
      icon: <Trash2 size={18} />,
      onClick: (item) => navigate(`/manage/delete-post/${item.id}`),
    },
  ];

  return (
    <PostManageStyles>
      <div className="header">
        <div className="header-top">
          <h1 className="dashboard-heading">Manage posts</h1>
          <Button
            className="header-button"
            onClick={() => navigate("/manage/add-post")}
          >
            <Plus size={18} style={{ marginRight: 6 }} />
            New Post
          </Button>
        </div>

        <InputSearch
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by title or author..."
        />
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Post Info</th>
                <th>ID</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Hot Post</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <Table.Row
                    key={post.id}
                    item={post}
                    columns={columns}
                    actions={actions}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="no-data">
                    No posts found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {filteredPosts.length > 0 && (
            <Pagination
              total={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
              current={currentPage}
              onChange={setCurrentPage}
              pageSize={POSTS_PER_PAGE}
              totalItems={filteredPosts.length}
            />
          )}
        </>
      )}
    </PostManageStyles>
  );
}
