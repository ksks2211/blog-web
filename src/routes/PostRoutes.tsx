import { Route, Routes } from "react-router-dom";
import CategorizedPostListPage from "../features/posts/pages/CategorizedPostListPage";
import MyPostListPage from "../features/posts/pages/MyPostListPage";
import PostCreatePage from "../features/posts/pages/PostCreatePage";
import PostDetailPage from "../features/posts/pages/PostDetailPage";
import PostListPage from "../features/posts/pages/PostListPage";
import PostSearchPage from "../features/posts/pages/PostSearchPage";
import PostUpdatePage from "../features/posts/pages/PostUpdatePage";

const PostRoutes = () => {
  return (
    <Routes>
      <Route index element={<PostListPage />} />
      <Route path="/create" element={<PostCreatePage />} />
      <Route path="/mine" element={<MyPostListPage />} />
      <Route path="/search" element={<PostSearchPage />} />
      <Route path="/:id" element={<PostDetailPage />} />
      <Route path="/update/:id" element={<PostUpdatePage />} />
      <Route path="/categories/:id" element={<CategorizedPostListPage />} />
    </Routes>
  );
};

export default PostRoutes;
