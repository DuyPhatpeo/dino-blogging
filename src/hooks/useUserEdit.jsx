import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase-config";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { userRole, userStatus } from "@utils/constants"; // 👈 import constants

// ✅ Yup schema cho User
const schema = yup.object({
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.number().required("Role is required"),
  status: yup.number().required("Status is required"),
});

export function useUserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      role: userRole.USER, // 👈 dùng constants
      status: userStatus.ACTIVE,
    },
  });

  const { reset } = form;

  useEffect(() => {
    async function fetchUser() {
      try {
        if (!id) return;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          reset(docSnap.data());
        } else {
          toast.error("❌ User not found!");
          navigate("/manage/user");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        toast.error("Error fetching user data");
      }
    }
    fetchUser();
  }, [id, reset, navigate]);

  const updateUserHandler = async (values) => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });

      toast.success("✅ User updated successfully!");
      navigate("/manage/user");
    } catch (error) {
      console.error("❌ Error updating user:", error);
      toast.error(error.message || "Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    updateUserHandler,
    loading,
  };
}
