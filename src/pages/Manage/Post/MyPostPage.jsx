import DashboardLayout from "@module/Dashboard/DashboardLayout";
import MyPost from "@module/Post/MyPost";
import React from "react";

const MyPostPage = () => {
  return (
    <DashboardLayout>
      <div className="mt-8">
        <MyPost />
      </div>
    </DashboardLayout>
  );
};

export default MyPostPage;
