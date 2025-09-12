import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { postStatus } from "@/utils/constants";
import { useImageUpload } from "@hooks/useImageUpload";

export function usePostAddNew() {
  const [posts, setPosts] = useState([]);
  const { uploadProgress, uploadImage } = useImageUpload();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "",
      category: "",
      image: null,
      hot: false,
    },
  });

  const addPostHandler = async (values) => {
    if (!values.slug)
      values.slug = slugify(values.title, { lower: true, strict: true });

    let imageUrl = "";
    if (values.image) {
      imageUrl = await uploadImage(values.image, "posts");
    }

    const newPost = { ...values, image: imageUrl };
    setPosts((prev) => [...prev, newPost]);
    form.reset();
  };

  return {
    posts,
    uploadProgress,
    form,
    addPostHandler,
  };
}
