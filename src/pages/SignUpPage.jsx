import React from "react";
import styled from "styled-components";
import { Mail, Lock, User } from "lucide-react";
import logo from "@assets/logo.png";

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

  form {
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 100%;
  }

  .field {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 8px;
  }

  .label {
    font-size: 15px;
    font-weight: 600;
    color: #374151;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  .input-wrapper input {
    width: 100%;
    height: 54px;
    padding: 0 16px 0 48px; /* chừa bên trái cho icon */
    border-radius: 14px;
    border: 2px solid #e5e7eb;
    background: #ffffffcc;
    font-size: 16px;
    transition: all 0.25s ease;
  }

  .input-wrapper input:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
  }

  .input-wrapper svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    width: 22px;
    height: 22px;
    pointer-events: none;
    transition: color 0.25s ease;
  }

  /* icon đổi màu khi input focus */
  .input-wrapper input:focus ~ svg {
    color: ${(props) => props.theme.primary};
  }

  .button {
    padding: 14px;
    border-radius: 14px;
    background: ${(props) => props.theme.primary};
    color: white;
    font-weight: 700;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    margin-top: 10px;
  }

  .button:hover {
    background: ${(props) => props.theme.primaryHover || "#23939f"};
    transform: translateY(-3px);
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

const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="wrapper">
        <img src={logo} alt="dinobblogging" className="logo" />
        <h1 className="heading">Create Your Account</h1>

        <form>
          <div className="field">
            <label htmlFor="fullname" className="label">
              Full name
            </label>
            <div className="input-wrapper">
              <input id="fullname" placeholder="Enter your full name" />
              <User />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="input-wrapper">
              <input id="email" type="email" placeholder="Enter your email" />
              <Mail />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              <Lock />
            </div>
          </div>

          <div className="extra-text">
            Already have an account? <a href="/signin">Sign in</a>
          </div>

          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
