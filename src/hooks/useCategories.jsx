import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@services/firebase/firebase-config";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "categories");
        const snapshot = await getDocs(colRef);
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(result);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
