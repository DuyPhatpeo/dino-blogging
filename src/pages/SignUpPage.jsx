import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock, User } from "lucide-react";
import logo from "@assets/logo.png";

import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";

const SignUpPageStyles = styled.div`
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

  .extra-text {
    margin-top: 25px;
    font-size: 16px;
    color: #374151;
  }

  .extra-text a {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    text-decoration: none;
  }

  .extra-text a:hover {
    text-decoration: underline;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 6px;
    text-align: left;
  }
`;

// ✅ Yup schema inline
const schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <SignUpPageStyles>
      <div className="wrapper">
        <img src={logo} alt="dinobblogging" className="logo" />
        <h1 className="heading">Create Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label htmlFor="fullname">Full name</Label>
            <Input
              name="fullname"
              control={control}
              placeholder="Enter your full name"
              icon={User}
            />
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              control={control}
              placeholder="Enter your email"
              icon={Mail}
            />
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              control={control}
              placeholder="Enter your password"
              icon={Lock}
            />
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              control={control}
              placeholder="Confirm your password"
              icon={Lock}
            />
          </Field>

          <ExtraText>
            Already have an account? <a href="/signin">Sign in</a>
          </ExtraText>

          <div className="button-wrapper">
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
