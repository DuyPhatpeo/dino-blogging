// PostAdd.jsx
import React from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import Radio from "@components/checkbox/Radio";
import { Dropdown } from "@/components/dropdown/Dropdown";
import Option from "@/components/dropdown/Option";
import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/input/Input";
import Label from "@components/label/Label";
import { postStatus } from "@/utils/constants";
import ImageUpload from "@components/imageUpload/ImageUpload";
import Toggle from "@components/toggle/Toggle";
import { usePostAdd } from "@/hooks/usePostAdd";
import useCategories from "@hooks/useCategories";
import FormError from "@components/error/FormError";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const PostAddNewStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

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

  .progress-bar {
    height: 6px;
    background: #0ea5e9;
    border-radius: 4px;
    margin-top: 8px;
  }
`;

const PostAdd = () => {
  const navigate = useNavigate();
  const { uploadProgress, form, addPostHandler, loading } = usePostAdd();
  const { control, watch, handleSubmit, formState } = form;
  const { errors } = formState;
  const watchStatus = watch("status");
  const { categories, error, loading: catLoading } = useCategories();

  return (
    <PostAddNewStyles>
      <div className="header">
        <h1 className="dashboard-heading">Add new post</h1>
        <Button
          type="button"
          height="52px"
          className="px-10"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} style={{ marginRight: 8 }} />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit(addPostHandler)}>
        {/* Title + Slug */}
        <div className="form-row">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
            />
            <FormError message={errors.title?.message} />
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

        {/* Status + Hot */}
        <div className="form-row">
          <Field>
            <Label>Status</Label>
            <div className="status-group">
              <Radio
                name="status"
                control={control}
                value={postStatus.APPROVED}
                checked={Number(watchStatus) === postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={postStatus.PENDING}
                checked={Number(watchStatus) === postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={postStatus.REJECTED}
                checked={Number(watchStatus) === postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>

          <Field>
            <Label>Hot Post</Label>
            <Controller
              control={control}
              name="hot"
              render={({ field: { value, onChange } }) => (
                <Toggle
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  label="Mark as hot"
                />
              )}
            />
          </Field>
        </div>

        {/* Author + Category */}
        <div className="form-row">
          <Field>
            <Label>Author</Label>
            <Input
              control={control}
              name="author"
              placeholder="Enter author name"
            />
            <FormError message={errors.author?.message} />
          </Field>

          <Field>
            <Label>Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => {
                if (catLoading) return <p>Loading categories...</p>;
                if (error) return <p>Error loading categories</p>;

                const activeCategories = categories.filter(
                  (c) => c.status === 1
                );
                const selected =
                  activeCategories.filter((c) => value?.includes(c.id)) || [];

                const handleChange = (selectedItems) => {
                  const ids = selectedItems.map((item) => item.id);
                  onChange(ids);
                };

                return (
                  <Dropdown
                    placeholder="Select categories"
                    selected={selected}
                    onChange={handleChange}
                    multiple
                  >
                    {activeCategories.map((cat) => (
                      <Option key={cat.id} value={cat} />
                    ))}
                  </Dropdown>
                );
              }}
            />
            <FormError message={errors.category?.message} />
          </Field>
        </div>

        {/* Thumbnail */}
        <div className="form-row">
          <Field>
            <Label>Thumbnail</Label>
            <ImageUpload
              control={control}
              name="image"
              label="Upload post thumbnail"
            />
            <FormError message={errors.image?.message} />
            {uploadProgress > 0 && (
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            )}
          </Field>
          <Field />
        </div>

        {/* Submit */}
        <div className="form-actions">
          <div />
          <Button
            type="submit"
            height="52px"
            className="px-10"
            isLoading={loading}
            variant="secondary"
          >
            <Save size={18} style={{ marginRight: 8 }} />
            Add new post
          </Button>
        </div>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAdd;
