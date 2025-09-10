import DashboardLayout from "@module/dasboard/DashboardLayout";
import React from "react";
import { FileText, Users, MessageSquare } from "lucide-react";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        {/* Header chào mừng */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Xin chào 👋</h1>
          <p className="mt-1 text-sm text-white/90">
            Đây là trang Dashboard của bạn. Xem nhanh thống kê hệ thống bên
            dưới.
          </p>
        </div>

        {/* Cards thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tổng bài viết
              </h3>
              <p className="text-2xl font-bold text-gray-800">120</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Người dùng</h3>
              <p className="text-2xl font-bold text-gray-800">56</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Bình luận</h3>
              <p className="text-2xl font-bold text-gray-800">430</p>
            </div>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Biểu đồ minh họa
          </h3>
          <div className="h-[300px] flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
            (Chart sẽ hiển thị ở đây)
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
