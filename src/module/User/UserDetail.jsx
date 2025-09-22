import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@services/firebase/firebase-config";
import { toast } from "react-toastify";

import Button from "@components/Button/Button";
import Field from "@components/Field/Field";
import Label from "@components/Label/Label";
import {
  userRoleLabel,
  userStatusLabel,
  userStatusStyle,
  userRoleStyle,
} from "@utils/constants";

const UserDetailStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 16px;
    flex-wrap: wrap;
  }

  h1.dashboard-heading {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0ea5e9;
    margin: 0;
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
    text-align: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #0ea5e9;
      margin-bottom: 16px;
    }

    .fullname {
      font-size: 1.4rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 4px;
    }

    .username {
      font-size: 1rem;
      color: #6b7280;
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .field-value {
    margin-top: 8px;
    font-weight: 500;
    color: #111827;
    word-break: break-word;
  }

  .field-label {
    font-weight: 700;
    color: #6b7280;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
  }
`;

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (!id) return;
        const docRef = doc(db, "users", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setUser({ id: snapshot.id, ...snapshot.data() });
        } else {
          toast.error("User not found!");
          navigate("/manage/user");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching user data");
      }
    }
    fetchUser();
  }, [id, navigate]);

  if (!user) return null;

  return (
    <UserDetailStyles>
      <div className="header">
        <h1 className="dashboard-heading">User Detail</h1>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>

      {/* Profile */}
      <div className="profile">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={`${user.fullname || "User"}'s avatar`}
        />
        <div className="fullname">{user.fullname || "-"}</div>
        <div className="username">@{user.username || "-"}</div>
      </div>

      {/* Info Grid */}
      <div className="info-grid">
        <Field>
          <Label className="field-label">Email:</Label>
          <div className="field-value">{user.email || "-"}</div>
        </Field>

        <Field>
          <Label className="field-label">Role:</Label>
          <div
            className="field-value"
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "12px",
              backgroundColor: userRoleStyle[user.role]?.bg,
              color: userRoleStyle[user.role]?.color,
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {userRoleLabel[user.role] || "-"}
          </div>
        </Field>

        <Field>
          <Label className="field-label">User ID:</Label>
          <div className="field-value">{user.uid || user.id}</div>
        </Field>

        <Field>
          <Label className="field-label">Status:</Label>
          <div
            className="field-value"
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "12px",
              backgroundColor: userStatusStyle[user.status]?.bg,
              color: userStatusStyle[user.status]?.color,
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {userStatusLabel[user.status] || "-"}
          </div>
        </Field>

        <Field>
          <Label className="field-label">Created At:</Label>
          <div className="field-value">
            {user.createdAt?.toDate
              ? user.createdAt.toDate().toLocaleString()
              : "-"}
          </div>
        </Field>
      </div>

      {/* Actions */}
      <div className="actions">
        <Button
          onClick={() => navigate(`/manage/update-user/${user.id}`)}
          variant="edit"
        >
          <Edit3 size={18} style={{ marginRight: "8px" }} />
          Edit
        </Button>
        <Button
          onClick={() => navigate(`/manage/delete-user/${user.id}`)}
          variant="delete"
        >
          <Trash2 size={18} style={{ marginRight: "8px" }} />
          Delete
        </Button>
      </div>
    </UserDetailStyles>
  );
};

export default UserDetail;
