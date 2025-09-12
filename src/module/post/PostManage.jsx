import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { Eye, Edit, Trash2 } from "lucide-react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { postStatusLabel, postStatusColor } from "@/utils/constants";

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
        map[doc.id] = doc.data().name; // map id → name
      });
      setCategories(map);
    }
    fetchCategories();
  }, []);

  // Fetch posts từ Firestore
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
            status: data.status, // number (1,2,3)
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

  // Pagination slice
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const columns = [
    {
      key: "image",
      render: (val) => (
        <img src={val || "/fallback.jpg"} alt="" className="table-image" />
      ),
      className: "image-cell",
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
    { key: "id", render: (val) => <span className="id-badge">#{val}</span> },
    {
      key: "category",
      render: (val) =>
        val.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              maxWidth: "200px", // optional, để tránh quá dài
            }}
          >
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
      render: (val) => (
        <span
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
        >
          {postStatusLabel[val] || "UNKNOWN"}
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

      {loading ? (
        <p>Loading posts...</p>
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
            total={Math.ceil(posts.length / POSTS_PER_PAGE)}
            current={currentPage}
            onChange={setCurrentPage}
            pageSize={POSTS_PER_PAGE}
            totalItems={posts.length}
          />
        </>
      )}
    </PostManageStyles>
  );
}
