import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "src/temp/table/Table";
import Pagination from "@components/Pagination/Pagination";
import { Edit, Trash2, Plus, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { db } from "@services/firebase/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import LoadingSpinner from "@components/Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button/Button";
import InputSearch from "@components/Input/InputSearch";

const CategoryManageStyles = styled.div`
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

  th.sortable {
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  .id-badge {
    display: inline-block;
    max-width: 100%;
    white-space: normal;
    word-break: break-all;
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

  /* 🔹 Responsive */
  @media (max-width: 1024px) {
    padding: 20px;

    h1.dashboard-heading {
      font-size: 1.5rem;
    }

    th,
    td {
      font-size: 0.9rem;
      padding: 8px;
    }

    .header-top {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .header-button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    table {
      display: block;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    th,
    td {
      white-space: nowrap;
    }

    /* Ẩn slug khi mobile */
    .slug-col {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: 16px;

    h1.dashboard-heading {
      font-size: 1.2rem;
    }

    .header {
      gap: 12px;
    }

    .header-top {
      gap: 6px;
    }

    .header-button {
      font-size: 0.9rem;
      padding: 6px 12px;
    }
  }
`;

const CATEGORIES_PER_PAGE = 10;

export default function CategoryManage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

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

  // Filter theo search
  const filteredCategories = categories.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort theo name
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    const aVal = a.name ?? "";
    const bVal = b.name ?? "";
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedCategories = sortedCategories.slice(
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

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const renderSortIcon = () => {
    return sortDirection === "asc" ? (
      <ArrowUp size={16} color="#0ea5e9" />
    ) : (
      <ArrowDown size={16} color="#0ea5e9" />
    );
  };

  const columns = [
    {
      key: "id",
      render: (val) => <span className="id-badge">#{val}</span>,
    },
    { key: "name" },
    { key: "slug", className: "slug-col" }, // 👈 sẽ bị ẩn ở mobile
    {
      key: "status",
      render: (val, item) => {
        const style =
          val === 1
            ? { bg: "#dcfce7", color: "#15803d", label: "Active" } // xanh nhạt
            : { bg: "#f3f4f6", color: "#4b5563", label: "Inactive" }; // xám nhạt

        return (
          <span
            className="clickable-status"
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              backgroundColor: style.bg,
              color: style.color,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onClick={() => toggleStatus(item.id, val)}
            title="Click to change status"
          >
            {style.label}
          </span>
        );
      },
    },
  ];

  const actions = [
    {
      type: "view",
      icon: <Eye size={18} />,
      onClick: (item) => {
        navigate(`/manage/view-category/${item.id}`);
      },
    },
    {
      type: "edit",
      icon: <Edit size={18} />,
      onClick: (item) => {
        navigate(`/manage/update-category/${item.id}`);
      },
    },
    {
      type: "delete",
      icon: <Trash2 size={18} />,
      onClick: (item) => {
        navigate(`/manage/delete-category/${item.id}`);
      },
    },
  ];

  return (
    <CategoryManageStyles>
      <div className="header">
        <div className="header-top">
          <h1 className="dashboard-heading">Manage categories</h1>
          <Button
            className="header-button"
            onClick={() => navigate("/manage/add-category")}
          >
            <Plus size={18} style={{ marginRight: 6 }} />
            New Category
          </Button>
        </div>

        {/* Search sử dụng InputSearch */}
        <InputSearch
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset về trang 1 khi search
          }}
          placeholder="Search by name or slug..."
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
                <th>ID</th>
                <th className="sortable" onClick={toggleSort}>
                  Name {renderSortIcon()}
                </th>
                <th className="slug-col">Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <Table.Row
                    key={category.id}
                    item={category}
                    columns={columns}
                    actions={actions}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="no-data">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {sortedCategories.length > 0 && (
            <Pagination
              total={Math.ceil(sortedCategories.length / CATEGORIES_PER_PAGE)}
              current={currentPage}
              onChange={setCurrentPage}
              pageSize={CATEGORIES_PER_PAGE}
              totalItems={sortedCategories.length}
            />
          )}
        </>
      )}
    </CategoryManageStyles>
  );
}
