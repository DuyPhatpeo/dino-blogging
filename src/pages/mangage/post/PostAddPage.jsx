import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import PostAdd from "@/module/post/PostAdd";

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
