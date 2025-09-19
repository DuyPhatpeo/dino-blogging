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

// Badge style (bg + text)
export const userStatusStyle = {
  [userStatus.INACTIVE]: { bg: "#f3f4f6", color: "#4b5563" }, // xám nhạt bg, chữ đậm
  [userStatus.ACTIVE]: { bg: "#dcfce7", color: "#15803d" }, // xanh nhạt bg, xanh đậm chữ
  [userStatus.BANNED]: { bg: "#fee2e2", color: "#b91c1c" }, // đỏ nhạt bg, đỏ đậm chữ
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

// Badge style (bg + text)
export const postStatusStyle = {
  [postStatus.APPROVED]: { bg: "#dcfce7", color: "#15803d" }, // xanh
  [postStatus.PENDING]: { bg: "#fef9c3", color: "#a16207" }, // vàng
  [postStatus.REJECTED]: { bg: "#fee2e2", color: "#b91c1c" }, // đỏ
  [postStatus.HIDDEN]: { bg: "#e5e7eb", color: "#374151" }, // xám
};
