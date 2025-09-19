import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase/firebase-config";
import { toast } from "react-toastify";

import Button from "@components/Button/Button";
import { ArrowLeft, Trash2, X } from "lucide-react";

import { useCategoryDelete } from "@hooks/useCategoryDelete";

const CategoryDeleteStyles = styled.div`
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
    margin-bottom: 16px;
    color: #ef4444;
  }

  .confirm-box {
    text-align: center;
    padding: 24px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
  }

  .actions {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
`;

const CategoryDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  // 🟢 dùng hook delete
  const { deleteCategoryHandler, loading } = useCategoryDelete();

  // fetch category để hiển thị tên
  useEffect(() => {
    async function fetchCategory() {
      try {
        if (!id) return;
        const docRef = doc(db, "categories", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setCategory({ id: snapshot.id, ...snapshot.data() });
        } else {
          toast.error("Category not found!");
          navigate("/manage/category");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching category data");
      }
    }
    fetchCategory();
  }, [id, navigate]);

  return (
    <CategoryDeleteStyles>
      <div className="header">
        <h1 className="dashboard-heading">Delete Category</h1>
        <Button className="header-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>

      <div className="confirm-box">
        <p>
          Are you sure you want to delete category{" "}
          <strong>{category?.name || "..."}</strong>
          {category?.id && ` (ID: ${category.id})`}?
        </p>
        <div className="actions">
          <Button
            onClick={() => deleteCategoryHandler(id)}
            isLoading={loading}
            variant="delete"
          >
            <Trash2 size={18} style={{ marginRight: "8px" }} />
            Delete
          </Button>
          <Button variant="cancel" onClick={() => navigate(-1)}>
            <X size={18} style={{ marginRight: "8px" }} />
            Cancel
          </Button>
        </div>
      </div>
    </CategoryDeleteStyles>
  );
};

export default CategoryDelete;
