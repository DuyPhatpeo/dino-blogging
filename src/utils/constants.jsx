// ======================
// USER CONSTANTS
// ======================

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

// Màu hiển thị theo status
export const userStatusColor = {
  [userStatus.INACTIVE]: "#9ca3af", // xám nhạt
  [userStatus.ACTIVE]: "#22c55e", // xanh
  [userStatus.BANNED]: "#ef4444", // đỏ
};

// ======================
// POST CONSTANTS
// ======================

// Status bài viết
export const postStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
  HIDDEN: 4, // Ẩn
};

// Map ngược: number -> text
export const postStatusLabel = {
  [postStatus.APPROVED]: "APPROVED",
  [postStatus.PENDING]: "PENDING",
  [postStatus.REJECTED]: "REJECTED",
  [postStatus.HIDDEN]: "HIDDEN",
};

// Màu hiển thị theo status
export const postStatusColor = {
  [postStatus.APPROVED]: "#22c55e", // xanh
  [postStatus.PENDING]: "#facc15", // vàng
  [postStatus.REJECTED]: "#ef4444", // đỏ
  [postStatus.HIDDEN]: "#6b7280", // xám
};
