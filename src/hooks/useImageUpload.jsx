import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@services/firebase/firebase-config";

export function useImageUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = (file, folder = "uploads") => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(url);
          setUploadProgress(0); // reset progress khi xong
          resolve(url);
        }
      );
    });
  };

  return {
    uploadProgress,
    imageUrl,
    uploadImage,
    setImageUrl, // optional: cho phép clear/reset
  };
}
