import React, { useState } from "react";
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
import { postStatus } from "@/utils/constants";
import ImageUpload from "@components/imageUpload/ImageUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase-config";

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
  .post-list {
    margin-top: 32px;
  }
  .post-item {
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    margin-bottom: 12px;
  }
  .progress-bar {
    height: 6px;
    background: #0ea5e9;
    margin-top: 8px;
    border-radius: 3px;
    transition: width 0.3s;
  }
`;

const PostAddNew = () => {
  const [posts, setPosts] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { control, watch, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "",
      category: "",
      image: null,
    },
  });

  const watchStatus = watch("status");

  const addPostHandler = async (values) => {
    if (!values.slug)
      values.slug = slugify(values.title, { lower: true, strict: true });

    let imageUrl = "";
    if (values.image) {
      const file = values.image;
      const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) =>
            setUploadProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            ),
          (error) => reject(error),
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    const newPost = { ...values, image: imageUrl };
    setPosts((prev) => [...prev, newPost]);
    setUploadProgress(0);
    reset();
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
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
        <div className="form-row">
          <Field>
            <Label>Thumbnail</Label>
            <ImageUpload
              control={control}
              name="image"
              label="Upload post thumbnail"
            />
            {uploadProgress > 0 && (
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            )}
          </Field>
          <Field />
        </div>
        <div className="form-actions">
          <Button type="submit" height="52px" className="px-10">
            Add new post
          </Button>
        </div>
      </form>

      <div className="post-list">
        {posts.map((post, index) => (
          <div className="post-item" key={index}>
            <h3>{post.title}</h3>
            <p>Slug: {post.slug}</p>
            <p>Status: {post.status}</p>
            <p>Author: {post.author}</p>
            <p>Category: {post.category}</p>
            {post.image && (
              <img
                src={post.image}
                alt="thumbnail"
                style={{ maxWidth: "200px", borderRadius: "12px" }}
              />
            )}
          </div>
        ))}
      </div>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
