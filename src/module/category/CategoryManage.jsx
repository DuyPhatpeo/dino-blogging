import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@components/table/Table";
import Pagination from "@components/pagination/Pagination";
import { Edit, Trash2 } from "lucide-react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
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
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
        const snapshot = await getDocs(colRef);

        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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

  // Toggle status
  const toggleStatus = async (categoryId, currentStatus) => {
    const nextStatus = currentStatus === 1 ? 2 : 1;
    try {
      const docRef = doc(db, "categories", categoryId);
      await updateDoc(docRef, { status: nextStatus });
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, status: nextStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    { key: "name" },
    { key: "slug" },
    {
      key: "id",
      render: (val) => <span className="id-badge">#{val.slice(0, 12)}</span>,
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
            backgroundColor: val === 1 ? "#22c55e" : "#6b7280",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
          onClick={() => toggleStatus(item.id, val)}
          title="Click to change status"
        >
          {val === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const actions = [
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
                <th>Name</th>
                <th>Slug</th>
                <th>ID</th>
                <th>Status</th>
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
