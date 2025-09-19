import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase/firebase-config";

import Button from "@components/Button/Button";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react";

const CategoryViewStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: ${(props) => props.theme.radius.lg};
  box-shadow: ${(props) => props.theme.shadow.card};

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }

  h1.dashboard-heading {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0ea5e9;
    margin: 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  .label {
    font-weight: 600;
    color: ${(props) => props.theme.colors.grayDark};
    margin-right: 8px;
  }

  .value {
    color: ${(props) => props.theme.colors.text};
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
  }

  .btn-edit {
    background: ${(props) => props.theme.colors.edit};
    color: #fff;
    &:hover {
      background: ${(props) => props.theme.colors.editHover};
    }
  }

  .btn-delete {
    background: ${(props) => props.theme.colors.delete};
    color: #fff;
    &:hover {
      background: ${(props) => props.theme.colors.deleteHover};
    }
  }
`;

const CategoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return;
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCategory({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Category not found!");
          navigate("/manage/category");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching category data");
      }
    }
    fetchData();
  }, [id, navigate]);

  if (!category) return null;

  // Format ngày tạo
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <CategoryViewStyles>
      <div className="header">
        <h1 className="dashboard-heading">Category Details</h1>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>

      <div className="info">
        <div>
          <span className="label">ID:</span>
          <span className="value">{category.id}</span>
        </div>
        <div>
          <span className="label">Name:</span>
          <span className="value">{category.name}</span>
        </div>
        <div>
          <span className="label">Slug:</span>
          <span className="value">{category.slug}</span>
        </div>
        <div>
          <span className="label">Status:</span>
          <span
            className="value"
            style={{
              background: category.status === 1 ? "#dcfce7" : "#f3f4f6",
              color: category.status === 1 ? "#15803d" : "#4b5563",
              padding: "4px 10px",
              borderRadius: "12px",
              fontWeight: 600,
            }}
          >
            {category.status === 1 ? "Active" : "Inactive"}
          </span>
        </div>

        <div>
          <span className="label">Created At:</span>
          <span className="value">{formatDate(category.createdAt)}</span>
        </div>
      </div>

      <div className="actions">
        <Button
          onClick={() => navigate(`/manage/update-category/${category.id}`)}
          className="btn-edit"
        >
          <Edit3 size={18} style={{ marginRight: "8px" }} />
          Edit
        </Button>
        <Button
          onClick={() => navigate(`/manage/delete-category/${category.id}`)}
          className="btn-delete"
        >
          <Trash2 size={18} style={{ marginRight: "8px" }} />
          Delete
        </Button>
      </div>
    </CategoryViewStyles>
  );
};

export default CategoryView;
