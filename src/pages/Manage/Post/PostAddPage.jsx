import React from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";
import PostAdd from "@/module/Post/PostAdd";

const PostAddNewPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <PostAdd />
      </div>
    </DashboardLayout>
  );
};

export default PostAddNewPage;
