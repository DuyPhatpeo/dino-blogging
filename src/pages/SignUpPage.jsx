import React from "react";
import { Mail, Lock, User } from "lucide-react";
import Field from "src/temp/field/Field";
import Label from "src/temp/label/Label";
import Input from "src/temp/input/Input";
import Button from "src/temp/button/Button";
import ExtraText from "src/temp/extraText/ExtraText";
import FormError from "src/temp/error/FormError";
import { useSignUp } from "@hooks/useSignUp";
import { FormProvider } from "react-hook-form";
import LayoutAuth from "src/temp/layout/LayoutAuth";

const SignUpPage = () => {
  const { form, signUpHandler, loading, navigate } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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

  return (
    <LayoutAuth title="Create Your Account" navigate={navigate}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(signUpHandler)}>
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
              <FormError message={errors[name]?.message} />
            </Field>
          ))}

          <ExtraText>
            Already have an account? <a href="/sign-in">Sign in</a>
          </ExtraText>

          <div className="button-wrapper">
            <Button type="submit" isLoading={loading}>
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </LayoutAuth>
  );
};

export default SignUpPage;
