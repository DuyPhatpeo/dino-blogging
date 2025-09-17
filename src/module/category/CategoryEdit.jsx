import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/input/Input";
import Label from "@components/label/Label";
import Radio from "@components/checkbox/Radio";
import FormError from "@components/error/FormError";
import { ArrowLeft } from "lucide-react";

const schema = yup.object({
  name: yup.string().required("Category name is required"),
  slug: yup.string(),
  status: yup.number().required("Status is required"),
});

const CategoryEditStyles = styled.div`
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
    margin-bottom: 32px;
    color: #0ea5e9;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .status-group {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 8px;
  }
`;

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });

  const { control, handleSubmit, reset, watch, formState } = form;
  const { errors } = formState;
  const watchStatus = watch("status", 1);

  // Fetch dữ liệu category
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return;
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset({
            name: data.name || "",
            slug: data.slug || "",
            status: data.status || 1,
          });
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
  }, [id, reset, navigate]);

  // Update category
  const updateCategoryHandler = async (values) => {
    try {
      setLoading(true);

      const slug =
        values.slug || slugify(values.name, { lower: true, strict: true });

      const docRef = doc(db, "categories", id);
      await updateDoc(docRef, {
        ...values,
        slug,
        updatedAt: serverTimestamp(),
      });

      toast.success("✅ Category updated successfully!");
      navigate("/manage/category");
    } catch (error) {
      console.error("❌ Error updating category:", error);
      toast.error(error.message || "Error updating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryEditStyles>
      <div className="header">
        <h1 className="dashboard-heading">Edit category</h1>
        <Button className="header-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(updateCategoryHandler)}>
        {/* Name + Slug */}
        <div className="form-row">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter category name"
            />
            <FormError message={errors.name?.message} />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter slug (auto if empty)"
            />
            <FormError message={errors.slug?.message} />
          </Field>
        </div>

        {/* Status */}
        <Field>
          <Label>Status</Label>
          <div className="status-group">
            <Radio
              name="status"
              control={control}
              value={1}
              checked={Number(watchStatus) === 1}
            >
              Active
            </Radio>
            <Radio
              name="status"
              control={control}
              value={2}
              checked={Number(watchStatus) === 2}
            >
              Inactive
            </Radio>
          </div>
          <FormError message={errors.status?.message} />
        </Field>

        {/* Submit */}
        <div className="form-actions">
          <Button
            type="submit"
            height="52px"
            className="px-10"
            isLoading={loading}
          >
            Update category
          </Button>
        </div>
      </form>
    </CategoryEditStyles>
  );
};

export default CategoryEdit;
