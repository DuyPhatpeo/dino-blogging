import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify"; // ✅ import toast
import logo from "@assets/logo.png";

import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";

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

// ✅ Yup schema in English
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // ✅ Example: login successful -> show toast
    toast.success("Signed in successfully!");
    // 👉 Replace with real API call
    // If login fails: toast.error("Invalid email or password!");
  };

  // ✅ Show validation errors via toast
  React.useEffect(() => {
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
  }, [errors]);

  return (
    <SignInPageStyles>
      <div className="wrapper">
        <img src={logo} alt="dinobblogging" className="logo" />
        <h1 className="heading">Welcome Back</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <ExtraText>
            Don’t have an account? <a href="/signup">Sign up</a>
          </ExtraText>

          <div className="button-wrapper">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </SignInPageStyles>
  );
};

export default SignInPage;
