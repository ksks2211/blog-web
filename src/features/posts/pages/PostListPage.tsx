import { InfiniteData } from "@tanstack/react-query";
import clsx from "clsx";
import LoadingPage from "../../shared/pages/LoadingPage";
import QueryErrorPage from "../../shared/pages/QueryErrorPage";
import PostList from "../components/PostList";
import { LoadMorePostsData } from "../post.types";
import { useLoadMorePosts } from "../usePost";

const PostListGuard = () => {
  const {
    data,
    isError,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useLoadMorePosts();

  if (isLoading) return <LoadingPage />;
  if (isError) return <QueryErrorPage />;
  if (data === undefined) return <QueryErrorPage />;

  return (
    <PostListPage
      data={data}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

interface PostListPageProps {
  data: InfiniteData<LoadMorePostsData, unknown>;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

function PostListPage({
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: PostListPageProps) {
  const { pages } = data;
  const accPostList = pages[0].postList;

  return (
    <div className="w-full flex flex-col">
      <PostList data={accPostList} />

      <button
        color="success"
        disabled={!hasNextPage || isFetchingNextPage}
        className={clsx(
          "w-fit btn btn-outline btn-primary px-5 py-2 font-bold rounded mx-auto mt-5 ",
          !hasNextPage || (isFetchingNextPage && "btn-disabled")
        )}
        onClick={fetchNextPage}
      >
        More
      </button>
    </div>
  );
}

export default PostListGuard;
