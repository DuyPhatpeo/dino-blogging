import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import logo from "@assets/logo.png";

import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/authContext";

const SignInPageStyles = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff, #e0f7fa);
  padding: 40px;
  .wrapper {
    width: 100%;
    max-width: 520px;
    text-align: center;
  }
  .logo {
    display: block;
    margin: 0 auto 30px;
    width: 90px;
  }
  .heading {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 40px;
    color: ${(props) => props.theme.primary};
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // ✅ Lưu vào context để Header nhận được
      signIn({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName:
          userCredential.user.displayName ||
          userCredential.user.email.split("@")[0],
      });

      toast.success(
        `Welcome back, ${
          userCredential.user.displayName || userCredential.user.email
        }!`
      );

      navigate("/");
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
    </SignInPageStyles>
  );
};

export default SignInPage;
