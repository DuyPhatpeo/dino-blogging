import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function useCategoryDelete() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteCategoryHandler = async (id) => {
    try {
      setLoading(true);
      if (!id) throw new Error("Category ID is required");

      await deleteDoc(doc(db, "categories", id));
      toast.success("Category deleted successfully!");
      navigate("/manage/category");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "Error deleting category");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCategoryHandler,
    loading,
  };
}
