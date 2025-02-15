import { toInteger } from "lodash-es";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../shared/httpRequestService";
import { PostCreateFormData } from "./components/PostCreateForm";
import {
  LoadMorePostsResponse,
  LoadPostOption,
  PostDeleteResponse,
  PostDetailResponse,
  PostPageResponse,
  PostPrevAndNextResponse,
  PostSearchParams,
} from "./post.types";
import postEndpoints from "./postEndpoints";

export async function getPosts({
  pageParam = 0,
  load = "older",
}: {
  pageParam: unknown;
  load?: LoadPostOption;
}) {
  const searchParams = new URLSearchParams();
  const postId = toInteger(pageParam);

  searchParams.set("postId", postId.toString());
  searchParams.set("load", load);

  return getRequest<LoadMorePostsResponse>(
    postEndpoints.loadPosts,
    searchParams
  ).then((res) => res.data);
}

export async function getCategorizedPosts(categoryId: number, page: number) {
  return getRequest<PostPageResponse>(
    postEndpoints.categorizedPosts(categoryId, page)
  ).then((res) => res.data);
}

export async function getPostDetail(postId: number) {
  return getRequest<PostDetailResponse>(postEndpoints.read(postId)).then(
    (res) => res.data
  );
}

export async function getPrevAndNextPost(postId: number) {
  return getRequest<PostPrevAndNextResponse>(
    postEndpoints.prevAndNext(postId)
  ).then((res) => res.data);
}

export async function getPostSearchResult(params: PostSearchParams) {
  const { mineOnly, tags, page } = params;

  const searchParams = new URLSearchParams();
  searchParams.append("mineOnly", mineOnly ? "true" : "false");
  tags.forEach((tag) => {
    searchParams.append("tags", tag);
  });
  searchParams.append("page", page.toString());

  return getRequest<PostPageResponse>(
    postEndpoints.searchPosts,
    searchParams
  ).then((res) => res.data);
}

export async function getMyPosts(page = 0) {
  return getRequest<PostPageResponse>(postEndpoints.myPosts(page)).then(
    (res) => res.data
  );
}

export async function deletePost(postId: number) {
  return deleteRequest<PostDeleteResponse>(postEndpoints.delete(postId)).then(
    (res) => res.data
  );
}

export async function postCreatePost(postCreateData: PostCreateFormData) {
  return postRequest<PostCreateFormData, PostDetailResponse>(
    postEndpoints.create,
    postCreateData
  ).then((res) => res.data);
}

export async function putUpdatePost({
  id,
  content,
  tags,
  title,
  categoryId,
}: PostCreateFormData & { id: number }) {
  return putRequest<PostCreateFormData, PostDetailResponse>(
    postEndpoints.update(id),
    { content, tags, title, categoryId }
  ).then((res) => res.data);
}
