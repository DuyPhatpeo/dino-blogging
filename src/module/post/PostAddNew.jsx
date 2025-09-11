import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import slugify from "slugify";
import Radio from "@components/checkbox/Radio";
import Dropdown from "@components/dorpdown/DropDown";
import Option from "@components/dorpdown/Option";
import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/input/Input";
import Label from "@components/label/Label";
import { postStatus } from "@utils/constants";

// Styled container
const PostAddNewStyles = styled.div`
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
`;

// Enum status

const PostAddNew = () => {
  const { control, watch, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "",
      category: "",
    },
  });

  const watchStatus = watch("status");

  const addPostHandler = (values) => {
    // ✅ Nếu slug trống thì tự tạo từ title
    if (!values.slug) {
      values.slug = slugify(values.title, {
        lower: true,
        strict: true, // loại bỏ ký tự đặc biệt
      });
    }
    console.log("✅ Post Data:", values);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        {/* Title & Slug */}
        <div className="form-row">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="Enter your title"
              required
            />
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug (auto if empty)"
            />
          </Field>
        </div>

        {/* Status & Author */}
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
            <Label>Author</Label>
            <Input
              control={control}
              name="author"
              placeholder="Find the author"
            />
          </Field>
        </div>

        {/* Category */}
        <div className="form-row">
          <Field>
            <Label>Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  placeholder="Please select an option"
                  selected={value}
                  onChange={onChange}
                >
                  <Option value="knowledge">Knowledge</Option>
                  <Option value="blockchain">Blockchain</Option>
                  <Option value="setup">Setup</Option>
                  <Option value="nature">Nature</Option>
                  <Option value="developer">Developer</Option>
                </Dropdown>
              )}
            />
          </Field>
          <Field />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <Button type="submit" height="52px" className="px-10">
            Add new post
          </Button>
        </div>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
