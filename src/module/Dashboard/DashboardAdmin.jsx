import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "@services/firebase/firebase-config";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";

// ========== Styled Components ==========
const DashboardWrapper = styled.div`
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px;
  color: #374151;
`;

const CardNumber = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #2563eb;
`;

const TableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TableTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 8px;
  border-bottom: 2px solid #e5e7eb;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Td = styled.td`
  padding: 12px 8px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #4b5563;
`;

const Status = styled.span`
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ status }) => (status === 1 ? "#065f46" : "#374151")};
  background: ${({ status }) => (status === 1 ? "#d1fae5" : "#e5e7eb")};
`;

// ========== Component ==========
export default function DashboardAdmin() {
  const [counts, setCounts] = useState({ users: 0, posts: 0, categories: 0 });
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const postsSnapshot = await getDocs(collection(db, "posts"));
        const categoriesSnapshot = await getDocs(collection(db, "categories"));

        setCounts({
          users: usersSnapshot.size,
          posts: postsSnapshot.size,
          categories: categoriesSnapshot.size,
        });

        // Lấy 5 post mới nhất
        const q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const latestSnapshot = await getDocs(q);
        const postsData = latestSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestPosts(postsData);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      <Grid>
        <Card>
          <CardTitle>Tổng số Users</CardTitle>
          <CardNumber>{loading ? "..." : counts.users}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Tổng số Posts</CardTitle>
          <CardNumber>{loading ? "..." : counts.posts}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Tổng số Categories</CardTitle>
          <CardNumber>{loading ? "..." : counts.categories}</CardNumber>
        </Card>
      </Grid>

      <TableWrapper>
        <TableTitle>Bài viết mới nhất</TableTitle>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : latestPosts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Tiêu đề</Th>
                <Th>Tác giả</Th>
                <Th>Ngày tạo</Th>
                <Th>Trạng thái</Th>
              </tr>
            </thead>
            <tbody>
              {latestPosts.map((post) => (
                <tr key={post.id}>
                  <Td>{post.title || "Không có tiêu đề"}</Td>
                  <Td>{post.authorId || "Ẩn danh"}</Td>
                  <Td>
                    {post.createdAt?.seconds
                      ? new Date(post.createdAt.seconds * 1000).toLocaleString(
                          "vi-VN"
                        )
                      : "N/A"}
                  </Td>
                  <Td>
                    <Status status={post.status}>
                      {post.status === 1 ? "Public" : "Draft"}
                    </Status>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>
    </DashboardWrapper>
  );
}
