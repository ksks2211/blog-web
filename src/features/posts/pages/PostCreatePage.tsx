import { useMyCategory } from "../../categories/useCategory";
import QueryGuard from "../../shared/components/QueryGuard";
import PostCreateForm from "../components/PostCreateForm";

export default function PostCreatePage() {
  const query = useMyCategory();

  return <QueryGuard query={query} Component={PostCreateForm} />;
}
