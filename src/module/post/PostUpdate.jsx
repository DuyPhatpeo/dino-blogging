import { Button } from "@components/button";
import { Field } from "@components/field";
import { Input } from "@components/input";
import { Label } from "@components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const PostUpdateStyles = styled.div`
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
    gap: 16px;
  }
`;

const PostUpdate = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  // 🔹 giả lập dữ liệu post đã có (API thực tế thì fetch theo id)
  const fakePost = {
    title: "My First Post",
    slug: "my-first-post",
    status: "Published",
    author: "Dino",
    category: "Tech",
    thumbnail: "https://source.unsplash.com/random/300x200?blog",
  };

  useEffect(() => {
    reset(fakePost); // điền sẵn data vào form
  }, [reset]);

  const onSubmit = (values) => {
    console.log("Updated post:", values);
    // TODO: call API update post ở đây
  };

  return (
    <PostUpdateStyles>
      <h1 className="dashboard-heading">Update Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title + Slug */}
        <div className="form-row">
          <Field>
            <Label>Title</Label>
            <Input control={control} name="title" placeholder="Enter title" />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} name="slug" placeholder="Enter slug" />
          </Field>
        </div>

        {/* Status + Author */}
        <div className="form-row">
          <Field>
            <Label>Status</Label>
            <Input
              control={control}
              name="status"
              placeholder="Draft / Published"
            />
          </Field>
          <Field>
            <Label>Author</Label>
            <Input control={control} name="author" placeholder="Enter author" />
          </Field>
        </div>

        {/* Category + Thumbnail */}
        <div className="form-row">
          <Field>
            <Label>Category</Label>
            <Input
              control={control}
              name="category"
              placeholder="Choose category"
            />
          </Field>
          <Field>
            <Label>Thumbnail</Label>
            <Input
              control={control}
              name="thumbnail"
              placeholder="Upload thumbnail URL"
            />
          </Field>
        </div>

        {/* Action */}
        <div className="form-actions">
          <Button type="submit" height="52px" className="px-8">
            Save Changes
          </Button>
          <Button type="button" height="52px" className="px-8" kind="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </PostUpdateStyles>
  );
};

export default PostUpdate;
