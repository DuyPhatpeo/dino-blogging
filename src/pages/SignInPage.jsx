import React from "react";
import { Mail, Lock } from "lucide-react";
import Field from "@components/field/Field";
import Label from "@components/label/Label";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import ExtraText from "@components/extraText/ExtraText";
import FormError from "@components/error/FormError";
import { useSignIn } from "@hooks/useSignIn";
import { FormProvider } from "react-hook-form";
import LayoutAuth from "@components/layout/LayoutAuth";

const SignInPage = () => {
  const { form, signInHandler, loading } = useSignIn();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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

  return (
    <LayoutAuth>
      <h1 className="heading">Sign In</h1>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(signInHandler)}>
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
            Don't have an account? <a href="/signup">Sign up</a>
          </ExtraText>

          <div className="button-wrapper">
            <Button type="submit" isLoading={loading}>
              Sign In
            </Button>
          </div>
        </form>
      </FormProvider>
    </LayoutAuth>
  );
};

export default SignInPage;
