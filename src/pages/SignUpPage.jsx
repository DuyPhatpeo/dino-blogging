// pages/SignUpPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import logo from "@assets/logo.png";

import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";

import { auth, db } from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Import constants
import { userRole, userStatus } from "@utils/userConstants";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #f0f4ff, #e0f7fa);

  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
  }

  .wrapper {
    width: 100%;
    max-width: 520px;
    text-align: center;
  }

  .logo {
    display: block;
    margin: 0 auto 20px;
    width: 90px;
  }

  .back-home {
    position: absolute;
    top: 20px;
    right: 20px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .heading {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 40px;
    color: ${(props) => props.theme.colors.primary};
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .footer {
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.gray};
    background: rgba(255, 255, 255, 0.6);
  }
`;

const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = [
    {
      name: "fullname",
      label: "Full name",
      placeholder: "Enter your full name",
      icon: User,
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      icon: Mail,
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      icon: Lock,
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      icon: Lock,
      type: "password",
    },
  ];

  const handleSignUp = async ({ fullname, email, password }) => {
    // Tạo user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update profile hiển thị
    await updateProfile(userCredential.user, { displayName: fullname });

    // Lưu user vào Firestore
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      uid: userCredential.user.uid,
      fullname,
      email,
      role: userRole.USER, // 0 - user
      status: userStatus.ACTIVE, // 1 - active
      createdAt: new Date(),
    });

    return userCredential.user;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await handleSignUp(data);
      toast.success("Register successful!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered. Please use another email.");
      } else {
        toast.error(error.message || "Sign up failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpPageStyles>
      <div className="main">
        <div className="back-home" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </div>

        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="heading">Create Your Account</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(({ name, label, placeholder, icon, type }) => (
              <Field key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  name={name}
                  type={type}
                  control={control}
                  placeholder={placeholder}
                  icon={icon}
                />
              </Field>
            ))}

            <ExtraText>
              Already have an account? <a href="/signin">Sign in</a>
            </ExtraText>

            <div className="button-wrapper">
              <Button type="submit" isLoading={loading}>
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Dino Blog. All rights reserved.
      </footer>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
