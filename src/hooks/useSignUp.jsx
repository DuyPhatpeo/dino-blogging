// hooks/useSignUp.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from "@services/firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { userRole, userStatus } from "@utils/constants";

// ✅ Schema validation
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

export function useSignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpHandler = async ({ fullname, email, password }) => {
    try {
      setLoading(true);

      // 1️⃣ Tạo user trên Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Update displayName
      await updateProfile(userCredential.user, { displayName: fullname });

      // 3️⃣ Lấy avatar mặc định từ Storage
      const avatarRef = ref(storage, "avatars/default.jpeg");
      const avatarURL = await getDownloadURL(avatarRef);

      // 4️⃣ Thêm user vào Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        fullname,
        email,
        role: userRole.USER,
        status: userStatus.ACTIVE,
        avatar: avatarURL, // ✅ avatar mặc định
        createdAt: new Date(),
      });

      toast.success("Register successful!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Sign up error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered. Please use another email.");
      } else {
        toast.error(error.message || "Sign up failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    signUpHandler,
    loading,
    navigate,
  };
}
