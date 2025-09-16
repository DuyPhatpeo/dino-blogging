import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import logo from "@assets/logo.png";

import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/authContext";
import { userStatus } from "@/utils/constants";

const SignInPageStyles = styled.div`
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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const fields = [
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
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 1. Đăng nhập Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const uid = userCredential.user.uid;

      // 2. Lấy thông tin user từ Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User record not found in database.");
        return;
      }

      const userData = userSnap.data();

      // 3. Kiểm tra trạng thái
      if (userData.status === userStatus.INACTIVE) {
        toast.error("Your account is inactive. Please contact support.");
        return;
      } else if (userData.status === userStatus.BANNED) {
        toast.error("Your account is banned. Access denied.");
        return;
      }

      // 4. Nếu ACTIVE, cập nhật context
      signIn({
        uid,
        email: userData.email,
        displayName: userData.fullname || userData.email.split("@")[0],
        role: userData.role,
        status: userData.status,
      });

      toast.success(`Welcome back, ${userData.fullname || userData.email}!`);
      navigate("/"); // điều hướng
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        toast.error("Email not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.");
      } else {
        toast.error(error.message || "Sign in failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInPageStyles>
      <div className="main">
        <div className="back-home" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </div>

        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="heading">Sign In</h1>

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
              Don't have an account? <a href="/signup">Sign up</a>
            </ExtraText>

            <div className="button-wrapper">
              <Button type="submit" isLoading={loading}>
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Dino Blog. All rights reserved.
      </footer>
    </SignInPageStyles>
  );
};

export default SignInPage;
