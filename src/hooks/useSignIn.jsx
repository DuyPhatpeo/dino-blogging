import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@services/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@contexts/authContext";
import { userStatus } from "@utils/constants";

// ✅ Schema validate
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function useSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const signInHandler = async ({ email, password }) => {
    try {
      setLoading(true);

      // 1. Đăng nhập Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
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

  return { form, signInHandler, loading, navigate };
}
