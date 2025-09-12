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
      category: [], // mảng id cho multi-select
      image: null,
      hot: false,
    },
  });

  const addPostHandler = async (values) => {
    // tạo slug nếu trống
    if (!values.slug)
      values.slug = slugify(values.title, { lower: true, strict: true });

    // upload ảnh nếu có
    let imageUrl = "";
    if (values.image) {
      imageUrl = await uploadImage(values.image, "posts");
    }

    // newPost giữ nguyên category là mảng id
    const newPost = { ...values, image: imageUrl };
    setPosts((prev) => [...prev, newPost]);

    // reset form về defaultValues
    form.reset({
      title: "",
      slug: "",
      status: postStatus.PENDING,
      author: "",
      category: [],
      image: null,
      hot: false,
    });
  };

  return {
    posts,
    uploadProgress,
    form,
    addPostHandler,
  };
}
