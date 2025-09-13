import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import slugify from "slugify";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// ✅ Yup schema cho category
const schema = yup.object({
  name: yup.string().required("Category name is required"),
  slug: yup.string(),
  description: yup.string(),
});

export function useAddCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const addCategoryHandler = async (values) => {
    try {
      setLoading(true);

      // tạo slug tự động nếu trống
      const slug =
        values.slug || slugify(values.name, { lower: true, strict: true });

      // lấy user từ Firebase Auth
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("You must be logged in to create a category.");
      }

      const newCategory = {
        ...values,
        slug,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      };

      // lưu Firestore
      const docRef = await addDoc(collection(db, "categories"), newCategory);

      // cập nhật local state
      setCategories((prev) => [...prev, { ...newCategory, id: docRef.id }]);

      // reset form
      form.reset({
        name: "",
        slug: "",
        description: "",
      });

      toast.success("✅ Category added successfully!");
      navigate("/manage/category");
    } catch (error) {
      console.error("❌ Error adding category:", error);
      toast.error(error.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    form,
    addCategoryHandler,
    loading,
  };
}
