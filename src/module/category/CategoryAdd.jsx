// CategoryAdd.jsx
import React from "react";
import styled from "styled-components";
import Button from "src/temp/button/Button";
import Field from "src/temp/field/Field";
import Input from "src/temp/input/Input";
import Label from "src/temp/label/Label";
import Radio from "src/temp/checkbox/Radio";
import FormError from "src/temp/error/FormError";
import { useCategoryAdd } from "@hooks/useCategoryAdd";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const CategoryAddNewStyles = styled.div`
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

const CategoryAdd = () => {
  const navigate = useNavigate();
  const { form, addCategoryHandler, loading } = useCategoryAdd();
  const { control, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  const watchStatus = watch("status", 1);

  return (
    <CategoryAddNewStyles>
      <div className="header">
        <h1 className="dashboard-heading">Add new category</h1>
        <Button className="header-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(addCategoryHandler)}>
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
            Add new category
          </Button>
        </div>
      </form>
    </CategoryAddNewStyles>
  );
};

export default CategoryAdd;
