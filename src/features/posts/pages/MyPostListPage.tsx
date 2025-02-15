import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { useScrollTopResetByParams } from "../../scroll/useScroll";
import QueryGuard from "../../shared/components/QueryGuard";
import { usePageParam } from "../../shared/hooks/useAddress";
import { TargetedEvent } from "../../shared/shared.types";
import PostList from "../components/PostList";
import { PostPageData } from "../post.types";
import { useMyPosts } from "../usePost";

export default function MyPostListPageGuard() {
  const { page } = usePageParam();
  const query = useMyPosts(page);

  return <QueryGuard query={query} Component={MyPostListPage} page={page} />;
}

function MyPostListPage({ data, page }: { data: PostPageData; page: number }) {
  const {
    postList,
    hasNextPage,
    hasPrevPage,
    pageNumber,
    firstPage,
    lastPage,
    totalPages,
  } = data;

  const [, setParams] = useSearchParams();
  useScrollTopResetByParams();

  const handleBtnClick = ({ currentTarget }: TargetedEvent) => {
    const targetPage = currentTarget.dataset.page as string;
    setParams((prev) => {
      prev.delete("page");
      prev.append("page", targetPage);
      return prev;
    });
  };

  return (
    <div className="w-full flex flex-col">
      <PostList data={postList} />

      <div className="join mx-auto mt-10">
        <button
          className={clsx("join-item btn", firstPage && "btn-disabled")}
          data-page={1}
          onClick={hasPrevPage ? handleBtnClick : undefined}
        >
          «
        </button>
        <button
          className={clsx("join-item btn", !hasPrevPage && "btn-disabled")}
          data-page={pageNumber - 1}
          onClick={hasPrevPage ? handleBtnClick : undefined}
        >
          ‹
        </button>
        <button className="join-item btn">Page {page}</button>
        <button
          className={clsx("join-item btn", !hasNextPage && "btn-disabled")}
          data-page={pageNumber + 1}
          onClick={hasNextPage ? handleBtnClick : undefined}
        >
          ›
        </button>

        <button
          className={clsx("join-item btn", lastPage && "btn-disabled")}
          data-page={totalPages}
          onClick={hasNextPage ? handleBtnClick : undefined}
        >
          »
        </button>
      </div>
    </div>
  );
}
