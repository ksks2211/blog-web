import { useInfiniteQuery } from "@tanstack/react-query";
import { LoadMorePostsData } from "./post.types";
import { getPosts } from "./postService";

export const useLoadMorePosts = () => {
  return useInfiniteQuery<LoadMorePostsData, Error>({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      const postList = lastPage.postList;
      return postList[postList.length - 1].id as number;
    },

    select: (data) => {
      const pages = data.pages;
      const mergedPage = pages.reduce(
        (acc, page) => {
          acc.hasMore = page.hasMore;
          acc.load = page.load;
          acc.postList = [...acc.postList, ...page.postList];
          acc.targetPostId = page.targetPostId;
          return acc;
        },
        {
          hasMore: true,
          load: "older",
          postList: [],
          targetPostId: 0,
        } as LoadMorePostsData
      );
      return { pages: [mergedPage], pageParams: data.pageParams };
    },
  });
};
