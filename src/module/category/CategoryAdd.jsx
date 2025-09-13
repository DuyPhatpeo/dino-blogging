import React from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/input/Input";
import Label from "@components/label/Label";
import Radio from "@components/checkbox/Radio";
import { useCategoryAdd } from "@hooks/useCategoryAdd";

const CategoryAddNewStyles = styled.div`
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
  .error {
    color: #ef4444;
    font-size: 14px;
    margin-top: 6px;
  }
`;

const CategoryAdd = () => {
  const { form, addCategoryHandler, loading } = useCategoryAdd();
  const { control, handleSubmit, watch } = form;
  const watchStatus = watch("status", 1);

  return (
    <CategoryAddNewStyles>
      <h1 className="dashboard-heading">Add new category</h1>
      <form onSubmit={handleSubmit(addCategoryHandler)}>
        {/* Name + Slug */}
        <div className="form-row">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter category name"
              required
            />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter slug (auto if empty)"
            />
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
        </Field>

        {/* Submit */}
        <div className="form-actions">
          <Button
            type="submit"
            height="52px"
            className="px-10"
            isLoading={loading}
          >
            Add new category
          </Button>
        </div>
      </form>
    </CategoryAddNewStyles>
  );
};

export default CategoryAdd;
