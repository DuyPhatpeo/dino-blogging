import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
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
`;

const SignInPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <SignInPageStyles>
      <div className="wrapper">
        <img src={logo} alt="dinoblogging" className="logo" />
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

          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </SignInPageStyles>
  );
};

export default SignInPage;
