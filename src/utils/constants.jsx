// ======================
// USER CONSTANTS
// ======================

// Roles
export const userRole = {
  ADMIN: 1,
  MODERATOR: 2,
  AUTHOR: 3,
  USER: 0,
};

// Map ngược: number -> text
export const userRoleLabel = {
  [userRole.USER]: "USER",
  [userRole.ADMIN]: "ADMIN",
  [userRole.MODERATOR]: "MODERATOR",
  [userRole.AUTHOR]: "AUTHOR",
};

// Badge style cho Role
export const userRoleStyle = {
  [userRole.USER]: { bg: "#e5e7eb", color: "#374151" },
  [userRole.ADMIN]: { bg: "#ffedd5", color: "#c2410c" },
  [userRole.MODERATOR]: { bg: "#dbeafe", color: "#1d4ed8" },
  [userRole.AUTHOR]: { bg: "#f0f9ff", color: "#0369a1" },
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
  [userStatus.INACTIVE]: { bg: "#f3f4f6", color: "#4b5563" },
  [userStatus.ACTIVE]: { bg: "#dcfce7", color: "#15803d" },
  [userStatus.BANNED]: { bg: "#fee2e2", color: "#b91c1c" },
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
  [postStatus.APPROVED]: { bg: "#dcfce7", color: "#15803d" },
  [postStatus.PENDING]: { bg: "#fef9c3", color: "#a16207" },
  [postStatus.REJECTED]: { bg: "#fee2e2", color: "#b91c1c" },
  [postStatus.HIDDEN]: { bg: "#e5e7eb", color: "#374151" },
};
