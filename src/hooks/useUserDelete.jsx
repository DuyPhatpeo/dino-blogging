import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@firebase/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useUserDelete() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteUserHandler = async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, "users", userId));
      toast.success("User deleted successfully!");
      navigate("/manage/user"); // 👈 quay lại trang danh sách user
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return { deleteUserHandler, loading };
}
