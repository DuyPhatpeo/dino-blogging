import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";
import { db } from "@firebase/firebase-config";

export function useCategoryEdit(reset) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu category
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return;
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset({
            name: data.name || "",
            slug: data.slug || "",
            status: data.status || 1,
          });
        } else {
          toast.error("Category not found!");
          navigate("/manage/category");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching category data");
      }
    }
    fetchData();
  }, [id, reset, navigate]);

  // Update category
  const updateCategoryHandler = async (values) => {
    try {
      setLoading(true);

      const slug =
        values.slug || slugify(values.name, { lower: true, strict: true });

      const docRef = doc(db, "categories", id);
      await updateDoc(docRef, {
        ...values,
        slug,
        updatedAt: serverTimestamp(),
      });

      toast.success("Category updated successfully!");
      navigate("/manage/category");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error.message || "Error updating category");
    } finally {
      setLoading(false);
    }
  };

  return { id, loading, updateCategoryHandler };
}
