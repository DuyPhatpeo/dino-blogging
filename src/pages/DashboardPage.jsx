import DashboardLayout from "@module/dasboard/DashboardLayout";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-semibold">Xin chào, đây là dashboard</h1>
        <p className="text-gray-600 mt-2">
          Đây là nội dung chính hiển thị trong layout. Bạn có thể thêm chart,
          bảng thống kê hoặc form tùy theo nhu cầu.
        </p>

        {/* Cards thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Tổng bài viết</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Người dùng</h3>
            <p className="text-2xl font-bold mt-2">56</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Bình luận</h3>
            <p className="text-2xl font-bold mt-2">430</p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Biểu đồ minh họa</h3>
          <div className="h-[300px] flex items-center justify-center text-gray-400 border border-dashed rounded">
            (Chart sẽ hiển thị ở đây)
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
