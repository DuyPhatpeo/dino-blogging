// pages/Profile.jsx
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@contexts/authContext";
import { toast } from "react-toastify";
import LoadingSpinner from "@components/Loading/LoadingSpinner";
import ImageUpload from "@components/ImageUpload/ImageUpload";
import { useProfileEdit } from "@hooks/useProfileEdit";

// ✅ Yup validation schema
const schema = yup.object({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Only letters, numbers, dot, dash, underscore allowed"
    ),
});

// ========== Styled ==========
const Wrapper = styled.div`
  max-width: 420px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
`;

const AvatarSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FullName = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
`;

const Username = styled.p`
  margin: 4px 0 0;
  font-size: 1rem;
  color: #718096;
`;

const InfoGroup = styled.div`
  margin: 16px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 6px;
  font-weight: 500;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f9fafb;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  background: #667eea;
  color: #fff;
  &:hover {
    background: #5a67d8;
  }
`;

const Error = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 4px;
`;

// ========== Component ==========
const Profile = () => {
  const { user } = useAuth();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: "",
      username: "",
      email: "",
      fullname: "",
    },
  });

  const { control, handleSubmit, reset, register, getValues, formState } = form;
  const { errors } = formState;

  const { profile, saving, updateProfile } = useProfileEdit(user, reset);

  const onSubmit = async (values) => {
    try {
      await updateProfile(values);
      toast.success("Cập nhật profile thành công!");
    } catch {
      toast.error("Không thể cập nhật profile");
    }
  };

  if (!profile) {
    return (
      <Wrapper>
        <LoadingSpinner size="40px" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AvatarSection>
          <ImageUpload
            control={control}
            name="avatar"
            width="120px"
            height="120px"
            shape="circle"
            defaultValue={getValues("avatar")}
          />
          <FullName>{getValues("fullname") || "Unknown User"}</FullName>
          <Username>@{getValues("username") || "user"}</Username>
        </AvatarSection>

        <InfoGroup>
          <Label>Username</Label>
          <Input {...register("username")} type="text" />
          {errors.username && <Error>{errors.username.message}</Error>}
        </InfoGroup>

        <InfoGroup>
          <Label>Email</Label>
          <Input {...register("email")} type="email" />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InfoGroup>

        <InfoGroup>
          <Label>Full Name</Label>
          <Input {...register("fullname")} type="text" />
          {errors.fullname && <Error>{errors.fullname.message}</Error>}
        </InfoGroup>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Cập nhật"}
        </Button>
      </form>
    </Wrapper>
  );
};

export default Profile;
