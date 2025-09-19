import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@components/Table/Table";
import Pagination from "@components/Pagination/Pagination";
import { Edit, Trash2, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { db } from "@/firebase/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import LoadingSpinner from "@components/Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import InputSearch from "@components/Input/InputSearch";

import {
  userRoleLabel,
  userRoleStyle,
  userStatus,
  userStatusLabel,
  userStatusStyle,
} from "@utils/constants";

const UserManageStyles = styled.div`
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

  .status-badge,
  .role-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
  }

  .no-data {
    text-align: center;
    padding: 20px;
    color: #6b7280;
    font-style: italic;
  }

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
    .email-col {
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
  }
`;

const USERS_PER_PAGE = 10;

export default function UserManage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Filter & sort
  const filteredUsers = users.filter(
    (u) =>
      u.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a.fullname ?? "";
    const bVal = b.fullname ?? "";
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // Toggle status
  const toggleStatus = async (userId, currentStatus) => {
    const nextStatus =
      currentStatus === userStatus.ACTIVE
        ? userStatus.INACTIVE
        : userStatus.ACTIVE;
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, { status: nextStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleSort = () =>
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  const renderSortIcon = () =>
    sortDirection === "asc" ? (
      <ArrowUp size={16} color="#0ea5e9" />
    ) : (
      <ArrowDown size={16} color="#0ea5e9" />
    );

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (val) => <span className="id-badge">#{val}</span>,
    },
    { key: "fullname", label: "Full Name" },
    { key: "email", label: "Email", className: "email-col" },
    {
      key: "role",
      label: "Role",
      render: (val) => {
        const style = userRoleStyle[val] || { bg: "#e5e7eb", color: "#374151" };
        return (
          <span
            className="role-badge"
            style={{ backgroundColor: style.bg, color: style.color }}
            title={userRoleLabel[val]}
          >
            {userRoleLabel[val]}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (val, item) => {
        const style = userStatusStyle[val] || {
          bg: "#f3f4f6",
          color: "#374151",
        };
        return (
          <span
            className="status-badge"
            style={{ backgroundColor: style.bg, color: style.color }}
            onClick={() => toggleStatus(item.id, val)}
            title="Click to toggle status"
          >
            {userStatusLabel[val]}
          </span>
        );
      },
    },
  ];

  const actions = [
    {
      type: "view",
      icon: <Eye size={18} />,
      onClick: (item) => navigate(`/manage/detail-user/${item.id}`),
    },
    {
      type: "edit",
      icon: <Edit size={18} />,
      onClick: (item) => navigate(`/manage/update-user/${item.id}`),
    },
    {
      type: "delete",
      icon: <Trash2 size={18} />,
      onClick: (item) => navigate(`/manage/delete-user/${item.id}`),
    },
  ];

  return (
    <UserManageStyles>
      <div className="header">
        <div className="header-top">
          <h1 className="dashboard-heading">Manage users</h1>
        </div>

        <InputSearch
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by fullname or email..."
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
                  Full Name {renderSortIcon()}
                </th>
                <th className="email-col">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <Table.Row
                    key={user.id}
                    item={user}
                    columns={columns}
                    actions={actions}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="no-data">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {sortedUsers.length > 0 && (
            <Pagination
              total={Math.ceil(sortedUsers.length / USERS_PER_PAGE)}
              current={currentPage}
              onChange={setCurrentPage}
              pageSize={USERS_PER_PAGE}
              totalItems={sortedUsers.length}
            />
          )}
        </>
      )}
    </UserManageStyles>
  );
}
