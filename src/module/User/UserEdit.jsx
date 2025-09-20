import React from "react";
import styled from "styled-components";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button/Button";
import Field from "@components/Field/Field";
import Input from "@components/Input/Input";
import Label from "@components/Label/Label";
import Radio from "@components/CheckBox/Radio";
import FormError from "@components/Error/FormError";
import ImageUpload from "@components/ImageUpload/ImageUpload";

import { useUserEdit } from "@hooks/useUserEdit";
import {
  userRole,
  userRoleLabel,
  userStatus,
  userStatusLabel,
} from "@utils/constants";

const UserEditStyles = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
    flex-wrap: wrap;
  }

  h1.dashboard-heading {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0ea5e9;
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .avatar-upload {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
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

  .radio-group {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 8px;
    flex-wrap: wrap;
  }
`;

const UserEdit = () => {
  const navigate = useNavigate();
  const { form, updateUserHandler, loading } = useUserEdit();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const watchStatus = watch("status", userStatus.ACTIVE);
  const watchRole = watch("role", userRole.USER);

  return (
    <UserEditStyles>
      {/* Header */}
      <div className="header">
        <h1 className="dashboard-heading">Edit User</h1>
        <Button
          type="button"
          height="52px"
          className="px-10"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit(updateUserHandler)}>
        {/* Avatar */}
        <div className="avatar-upload">
          <ImageUpload
            control={control}
            name="avatar"
            width="120px"
            height="120px"
            shape="circle"
            defaultValue={form.getValues("avatar")}
          />
        </div>

        {/* Fullname + Email */}
        <div className="form-row">
          <Field>
            <Label>
              Full Name
              {errors.fullname && (
                <FormError>{errors.fullname.message}</FormError>
              )}
            </Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter full name"
              rules={{ required: "Full name is required" }}
            />
          </Field>
          <Field>
            <Label>
              Email
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter email"
              type="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }}
            />
          </Field>
        </div>

        {/* Status */}
        <Field>
          <Label>Status</Label>
          <div className="radio-group">
            {Object.values(userStatus).map((status) => (
              <Radio
                key={status}
                name="status"
                control={control}
                value={status}
                checked={Number(watchStatus) === status}
              >
                {userStatusLabel[status]}
              </Radio>
            ))}
          </div>
        </Field>

        {/* Role */}
        <Field>
          <Label>Role</Label>
          <div className="radio-group">
            {Object.values(userRole).map((role) => (
              <Radio
                key={role}
                name="role"
                control={control}
                value={role}
                checked={Number(watchRole) === role}
              >
                {userRoleLabel[role]}
              </Radio>
            ))}
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
            <Save size={18} style={{ marginRight: "8px" }} />
            Update User
          </Button>
        </div>
      </form>
    </UserEditStyles>
  );
};

export default UserEdit;
