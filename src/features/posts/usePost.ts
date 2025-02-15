import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SnackbarSeverity } from "../shared/hooks/useSnackbarState";
import { PostCreateFormData } from "./components/PostCreateForm";
import {
  LoadMorePostsData,
  PostDetailData,
  PostPageData,
  PostSearchParams,
  PrevAndNextPost,
} from "./post.types";
import {
  deletePost,
  getCategorizedPosts,
  getMyPosts,
  getPostDetail,
  getPosts,
  getPostSearchResult,
  getPrevAndNextPost,
  postCreatePost,
  putUpdatePost,
} from "./postService";

// React-Query
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

export const useMyPosts = (page = 1) => {
  return useQuery<PostPageData>({
    queryKey: ["my-posts", { page }],
    queryFn: () => getMyPosts(page),
  });
};

export const useSearchPosts = ({
  mineOnly,
  page,
  tags,
  enabled,
}: PostSearchParams & { enabled: boolean }) => {
  return useQuery<PostPageData>({
    queryKey: ["search-posts", { mineOnly, page, tags }],
    queryFn: () => getPostSearchResult({ mineOnly, page, tags }),
    enabled,
  });
};

export const useCategorizedPosts = (categoryId: number, page: number) => {
  return useQuery<PostPageData>({
    queryKey: ["categorized-posts", { categoryId, page }],
    queryFn: () => getCategorizedPosts(categoryId, page),
  });
};

export const useGetPostDetail = (postId: number) => {
  return useQuery<PostDetailData>({
    queryKey: ["post", { postId }],
    queryFn: () => getPostDetail(postId),
  });
};

export const usePrevAndNextPost = ({
  postId,
  enabled,
}: {
  postId: number;
  enabled: boolean;
}) => {
  return useQuery<PrevAndNextPost, Error>({
    queryKey: ["prev-next-post", { postId }],
    queryFn: () => getPrevAndNextPost(postId),
    enabled,
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: ["post", { postId: id }],
      });
    },
  });
};

export const useCreatePostMutation = ({
  setSnackbarMessage,
}: {
  setSnackbarMessage: (msg: string, severity?: SnackbarSeverity) => void;
}) => {
  const navigate = useNavigate();
  return useMutation<PostDetailData, Error, PostCreateFormData>({
    mutationFn: postCreatePost,
    onSuccess: (data) => {
      setSnackbarMessage("Created", "success");
      setTimeout(() => navigate(`/posts/${data.id}`), 500);
    },
    onError: (err) => {
      setSnackbarMessage(err.message);
    },
  });
};

export const useUpdatePostMutation = ({
  setSnackbarMessage,
}: {
  setSnackbarMessage: (msg: string, severity?: SnackbarSeverity) => void;
}) => {
  const navigate = useNavigate();
  return useMutation<
    PostDetailData,
    Error,
    PostCreateFormData & {
      id: number;
    }
  >({
    mutationFn: putUpdatePost,
    onSuccess: (data) => {
      setSnackbarMessage("Updated!", "success");
      setTimeout(() => navigate(`/posts/${data.id}`), 500);
    },
    onError: (err) => {
      setSnackbarMessage(err.message);
    },
  });
};
