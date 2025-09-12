import React from "react";
import DashboardLayout from "@module/dasboard/DashboardLayout";
import PostAddNew from "@module/post/PostAddNew";

const PostAddNewPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <PostAddNew />
      </div>
    </DashboardLayout>
  );
};

export default PostAddNewPage;
