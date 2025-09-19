import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, Save } from "lucide-react";

import Button from "@components/Button/Button";
import Field from "@components/Field/Field";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Radio from "@components/Checkbox/Radio";
import FormError from "@components/Error/FormError";
import { useCategoryEdit } from "@hooks/useCategoryEdit";

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
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 700;
    margin: 0;
    color: ${(props) => props.theme.colors.primary};
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
    gap: 12px;
  }

  .status-group {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 8px;
  }
`;

const CategoryEdit = () => {
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

  const { categoryData, loading, updateCategoryHandler } =
    useCategoryEdit(reset);

  // Khi dữ liệu category load xong, reset form với giá trị thật
  useEffect(() => {
    if (categoryData) {
      reset({
        name: categoryData.name,
        slug: categoryData.slug,
        status: categoryData.status,
      });
    }
  }, [categoryData, reset]);

  return (
    <CategoryEditStyles>
      <div className="header">
        <h1 className="dashboard-heading">Edit category</h1>
        <Button className="header-button" onClick={() => window.history.back()}>
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
            variant="secondary"
          >
            <Save size={18} style={{ marginRight: "8px" }} />
            Update category
          </Button>
        </div>
      </form>
    </CategoryEditStyles>
  );
};

export default CategoryEdit;
