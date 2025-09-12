import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const colRef = collection(db, "categories");
      const snapshot = await getDocs(colRef);
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(result);
    }
    fetchCategories();
  }, []);

  return categories;
}
