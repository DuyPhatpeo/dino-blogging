// utils/constants.jsx
export const postStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};

// Helper map ngược: number -> text
export const postStatusLabel = {
  [postStatus.APPROVED]: "APPROVED",
  [postStatus.PENDING]: "PENDING",
  [postStatus.REJECTED]: "REJECTED",
};

// Helper màu theo status
export const postStatusColor = {
  [postStatus.APPROVED]: "#22c55e", // xanh
  [postStatus.PENDING]: "#facc15", // vàng
  [postStatus.REJECTED]: "#ef4444", // đỏ
};
