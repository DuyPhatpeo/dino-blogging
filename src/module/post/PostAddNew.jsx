import { Button } from "@components/button";
import { Field } from "@components/field";
import { Input } from "@components/input";
import { Label } from "@components/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const PostAddNewStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h1.dashboard-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 32px;
    color: #222;
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
  }
`;

const PostAddNew = () => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (values) => {
    console.log("Post data:", values);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title + Slug */}
        <div className="form-row">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your post title"
              name="title"
            />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter post slug"
              name="slug"
            />
          </Field>
        </div>

        {/* Status + Author */}
        <div className="form-row">
          <Field>
            <Label>Status</Label>
            {/* Có thể thay bằng radio / select */}
            <Input
              control={control}
              placeholder="Draft / Published"
              name="status"
            />
          </Field>
          <Field>
            <Label>Author</Label>
            <Input
              control={control}
              placeholder="Enter author name"
              name="author"
            />
          </Field>
        </div>

        {/* Category + Empty field (dành cho thumbnail / tag sau này) */}
        <div className="form-row">
          <Field>
            <Label>Category</Label>
            <Input
              control={control}
              placeholder="Choose category"
              name="category"
            />
          </Field>
          <Field>
            <Label>Thumbnail</Label>
            <Input
              control={control}
              placeholder="Upload thumbnail URL"
              name="thumbnail"
            />
          </Field>
        </div>

        {/* Action */}
        <div className="form-actions">
          <Button type="submit" height="52px" className="px-10">
            Add New Post
          </Button>
        </div>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
