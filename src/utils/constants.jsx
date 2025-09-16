// utils/userConstants.jsx

// Roles
export const userRole = {
  USER: 0,
  ADMIN: 1,
  MODERATOR: 2,
};

// Map ngược: number -> text
export const userRoleLabel = {
  [userRole.USER]: "USER",
  [userRole.ADMIN]: "ADMIN",
  [userRole.MODERATOR]: "MODERATOR",
};

// Status của user
export const userStatus = {
  INACTIVE: 0,
  ACTIVE: 1,
  BANNED: 2,
};

// Map ngược: number -> text
export const userStatusLabel = {
  [userStatus.INACTIVE]: "INACTIVE",
  [userStatus.ACTIVE]: "ACTIVE",
  [userStatus.BANNED]: "BANNED",
};

// Optional: màu hiển thị theo status
export const userStatusColor = {
  [userStatus.INACTIVE]: "#9ca3af", // xám nhạt
  [userStatus.ACTIVE]: "#22c55e", // xanh
  [userStatus.BANNED]: "#ef4444", // đỏ
};
