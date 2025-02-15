import { Category } from "../../categories/category.types";
import { useGetCategory } from "../../categories/useCategory";
import QueryGuard, {
  QueryGuardWithSkeleton,
} from "../../shared/components/QueryGuard";
import { usePageParam, usePathId } from "../../shared/hooks/useAddress";
import { useCategorizedPosts } from "../usePost";
import { PostSearchResult } from "./PostSearchPage";

function Skeleton() {
  return (
    <div className="mt-10 flex flex-col gap-8 md:mx-20">
      <div className="skeleton h-32 w-5/6 mx-auto"></div>
      <div className="skeleton h-32 w-5/6 mx-auto"></div>
    </div>
  );
}

function CategoryInfo({ data }: { data: Category }) {
  const { categoryName, postCount } = data;

  return (
    <div className="bg-orange-500">
      <h1 className=" h-10 flex items-center justify-center text-base-200 text-lg font-bold">
        Category : {categoryName}
      </h1>
      <h1 className=" h-8 flex items-center justify-center text-base-200">
        Number of posts : {postCount}
      </h1>
    </div>
  );
}

export default function CategorizedPostListGuard() {
  const id = parseInt(usePathId());
  const { page } = usePageParam();

  const query1 = useGetCategory(id);
  const query2 = useCategorizedPosts(id, page);

  return (
    <>
      <QueryGuard query={query1} Component={CategoryInfo} />

      <QueryGuardWithSkeleton
        query={query2}
        Component={PostSearchResult}
        Skeleton={Skeleton}
        page={page}
      />
    </>
  );
}
