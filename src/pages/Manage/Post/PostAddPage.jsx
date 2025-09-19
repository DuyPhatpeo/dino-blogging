import React from "react";
import DashboardLayout from "@module/Dashboard/DashboardLayout";
import PostAdd from "@module/dasddddd/PostAdd";

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
