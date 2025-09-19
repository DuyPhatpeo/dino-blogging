// DashboardPage.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/module/Dasboard/DashboardLayout";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    activeCategories: 0,
    pendingPosts: 0,
  });

  // Giả lập fetch data từ API
  useEffect(() => {
    // Thay bằng fetch thật sau này
    setStats({
      totalPosts: 128,
      totalUsers: 56,
      activeCategories: 12,
      pendingPosts: 8,
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="mt-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Total Posts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Posts</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalPosts}</p>
          </div>

          {/* Card Total Users */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>

          {/* Card Active Categories */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Categories</h2>
            <p className="text-3xl font-bold mt-2">{stats.activeCategories}</p>
          </div>

          {/* Card Pending Posts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Pending Posts</h2>
            <p className="text-3xl font-bold mt-2">{stats.pendingPosts}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
