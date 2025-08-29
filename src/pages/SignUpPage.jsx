import React from "react";
import styled from "styled-components";
import logo from "@assets/logo.png";
import { Label } from "@components/label";
import { Input } from "@components/input";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;

  .container {
    width: 100%;
    max-width: 420px;
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .logo {
    display: block;
    margin: 0 auto 20px;
    width: 70px;
  }

  .heading {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 30px;
    color: ${(props) => props.theme.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .button {
    padding: 14px;
    border-radius: 10px;
    background: ${(props) => props.theme.primary};
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    margin-top: 10px;
  }

  .button:hover {
    background: ${(props) => props.theme.primaryHover || "#23939f"};
  }

  .extra-text {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #6b7280;
  }

  .extra-text a {
    color: ${(props) => props.theme.primary};
    font-weight: 500;
    text-decoration: none;
  }

  .extra-text a:hover {
    text-decoration: underline;
  }
`;

const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="container">
        <img src={logo} alt="dinobblogging" className="logo" />
        <h1 className="heading">Dino Blogging</h1>
        <form>
          <div className="field">
            <Label htmlFor="fullname">Full name</Label>
            <Input id="fullname" placeholder="Enter your fullname" />
          </div>

          <div className="field">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="button">
            Sign Up
          </button>
        </form>

        <div className="extra-text">
          Already have an account? <a href="/signin">Sign in</a>
        </div>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
