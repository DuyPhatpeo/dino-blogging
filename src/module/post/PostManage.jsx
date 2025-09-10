import React, { useState } from "react";
import Table from "@components/table/Table";
import PostRow from "@module/post/PostRow";
import Pagination from "@components/pagination/Pagination";
import { MOCK_POSTS } from "@/data/posts";

const POSTS_PER_PAGE = 10;

export default function PostManage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_POSTS.length / POSTS_PER_PAGE);

  const paginatedPosts = MOCK_POSTS.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Posts</h1>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Post Info</th>
            <th>ID</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </tbody>
      </Table>

      <Pagination
        total={totalPages}
        current={currentPage}
        onChange={setCurrentPage}
        pageSize={POSTS_PER_PAGE}
        totalItems={MOCK_POSTS.length}
      />
    </div>
  );
}
