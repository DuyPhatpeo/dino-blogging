import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { Eye, Edit, Trash2 } from "lucide-react";
import { db } from "@/firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { postStatusLabel, postStatusColor } from "@/utils/constants";
import LoadingSpinner from "@components/loading/LoadingSpinner";

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

  .table-image {
    width: 300px;
    height: auto;
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

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
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
`;

const POSTS_PER_PAGE = 10;

export default function PostManage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const colRef = collection(db, "categories");
      const snapshot = await getDocs(colRef);
      const map = {};
      snapshot.docs.forEach((doc) => {
        map[doc.id] = doc.data().name;
      });
      setCategories(map);
    }
    fetchCategories();
  }, []);

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const colRef = collection(db, "posts");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const result = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            image: data.image,
            category: Array.isArray(data.category) ? data.category : [],
            status: data.status,
            author: data.author || "Anonymous",
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleDateString("vi-VN")
              : "",
            hot: data.hot || false,
          };
        });

        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const toggleHot = async (postId, currentHot) => {
    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { hot: !currentHot });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, hot: !currentHot } : p))
      );
    } catch (error) {
      console.error("Error updating hot status:", error);
    }
  };

  const toggleStatus = async (postId, currentStatus) => {
    // Flow: PENDING (2) → APPROVED (1) → HIDDEN (4) → REJECTED (3) → PENDING (2)
    const flow = [2, 1, 4, 3];
    const currentIndex = flow.indexOf(currentStatus);
    const nextStatus = flow[(currentIndex + 1) % flow.length];

    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { status: nextStatus });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: nextStatus } : p))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
          <h3 style={{ fontWeight: 600 }}>{val}</h3>
          <time style={{ fontSize: "0.85rem", color: "#6b7280" }}>
            {item.createdAt}
          </time>
        </div>
      ),
    },
    {
      key: "id",
      render: (val) => <span className="id-badge">#{val.slice(0, 10)}</span>,
    },
    {
      key: "category",
      render: (val) =>
        val.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {val.map((id, index) => (
              <span
                key={id + index}
                className="badge"
                style={{
                  background: "#f3f4f6",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                }}
              >
                {categories[id] || id}
              </span>
            ))}
          </div>
        ) : (
          <span>—</span>
        ),
    },
    {
      key: "status",
      render: (val, item) => (
        <span
          className="clickable-status"
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "4px",
            color: "#fff",
            backgroundColor: postStatusColor[val] || "#6b7280",
            fontSize: "0.8rem",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
          onClick={() => toggleStatus(item.id, val)}
          title="Click to change status"
        >
          {postStatusLabel[val] || "UNKNOWN"}
        </span>
      ),
    },
    {
      key: "hot",
      render: (val, item) => (
        <input
          type="checkbox"
          checked={val}
          onChange={() => toggleHot(item.id, val)}
        />
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
                <th>Status</th>
                <th>Hot Post</th>
                <th>Author</th>
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
                    No posts yet
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {posts.length > 0 && (
            <Pagination
              total={Math.ceil(posts.length / POSTS_PER_PAGE)}
              current={currentPage}
              onChange={setCurrentPage}
              pageSize={POSTS_PER_PAGE}
              totalItems={posts.length}
            />
          )}
        </>
      )}
    </PostManageStyles>
  );
}
