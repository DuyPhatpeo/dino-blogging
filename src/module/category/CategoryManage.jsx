import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { Eye, Edit, Trash2 } from "lucide-react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import LoadingSpinner from "@components/loading/LoadingSpinner";

const CategoryManageStyles = styled.div`
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
`;

const CATEGORIES_PER_PAGE = 10;

export default function CategoryManage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const colRef = collection(db, "categories");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          slug: doc.data().slug,
          description: doc.data().description || "",
          createdAt: doc.data().createdAt?.toDate
            ? doc.data().createdAt.toDate().toLocaleDateString("vi-VN")
            : "",
        }));

        setCategories(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const paginatedCategories = categories.slice(
    (currentPage - 1) * CATEGORIES_PER_PAGE,
    currentPage * CATEGORIES_PER_PAGE
  );

  const columns = [
    {
      key: "id",
      render: (val) => <span className="id-badge">#{val.slice(0, 10)}</span>,
    },
    {
      key: "name",
      render: (val) => <strong>{val}</strong>,
    },
    {
      key: "slug",
    },
    {
      key: "description",
      render: (val) => val || "—",
    },
    {
      key: "createdAt",
    },
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
    <CategoryManageStyles>
      <h1 className="dashboard-heading">Manage categories</h1>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category) => (
                <Table.Row
                  key={category.id}
                  item={category}
                  columns={columns}
                  actions={actions}
                />
              ))}
            </tbody>
          </Table>

          <Pagination
            total={Math.ceil(categories.length / CATEGORIES_PER_PAGE)}
            current={currentPage}
            onChange={setCurrentPage}
            pageSize={CATEGORIES_PER_PAGE}
            totalItems={categories.length}
          />
        </>
      )}
    </CategoryManageStyles>
  );
}
