import { InfiniteData } from "@tanstack/react-query";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../shared/pages/LoadingPage";
import QueryErrorPage from "../../shared/pages/QueryErrorPage";
import type { TargetedEvent } from "../../shared/shared.types";
import { formatDateFromNow } from "../../shared/utils/dateUtils";
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
  const navigate = useNavigate();

  const handleClickLink = ({ currentTarget }: TargetedEvent) => {
    const link = currentTarget.dataset.link as string;
    navigate(link);
  };

  return (
    <div className="w-full py-10 flex flex-col">
      <ul className="w-full flex flex-col gap-6 p-3 md:px-12 lg:px-16 xl:px-24">
        {accPostList.map((post) => (
          <li
            key={post.id}
            className="bg-indigo-200/50 hover:bg-indigo-200/90 ring-1 ring-indigo-200  min-h-36 transition cursor-pointer flex flex-col justify-center px-5 md:px-10"
            onClick={handleClickLink}
            data-link={`/posts/${post.id}`}
          >
            <h3 className="text-xl font-extrabold overflow-ellipsis">
              {post.title}
            </h3>
            <p className="mt-1">{post.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs">
                {formatDateFromNow(post.createdAt)}
              </span>
              <span className="font-bold text-neutral/75">
                Posted by {post.writerName}
              </span>
            </div>
          </li>
        ))}
      </ul>

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
