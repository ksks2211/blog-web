import { useMyCategory } from "../../categories/useCategory";
import QueryGuard from "../../shared/components/QueryGuard";
import { usePathId } from "../../shared/hooks/useAddress";
import PostCreateForm from "../components/PostCreateForm";
import { PostDetailData } from "../post.types";
import { useGetPostDetail } from "../usePost";

export default function GetPostDetailGuard() {
  const postId = parseInt(usePathId());
  const query = useGetPostDetail(postId);
  return <QueryGuard query={query} Component={PostUpdatePage} />;
}

function PostUpdatePage({ data }: { data: PostDetailData }) {
  const query = useMyCategory();
  return (
    <QueryGuard query={query} Component={PostCreateForm} defaultValues={data} />
  );
}
