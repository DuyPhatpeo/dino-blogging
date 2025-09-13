import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { toast } from "react-toastify";

import Button from "@components/button/Button";
import { ArrowLeft, Trash2 } from "lucide-react";

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
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Xoá category
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "categories", id));
      toast.success("🗑️ Category deleted successfully!");
      navigate("/manage/category");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error deleting category");
    } finally {
      setLoading(false);
    }
  };

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
          Bạn có chắc chắn muốn xoá category{" "}
          <strong>{category?.name || "..."}</strong> không?
        </p>
        <div className="actions">
          <Button
            onClick={handleDelete}
            isLoading={loading}
            style={{ backgroundColor: "#ef4444" }}
          >
            <Trash2 size={18} style={{ marginRight: "8px" }} />
            Xoá
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Huỷ
          </Button>
        </div>
      </div>
    </CategoryDeleteStyles>
  );
};

export default CategoryDelete;
