import { toInteger } from "lodash-es";
import { getRequest } from "../shared/httpRequestService";
import { LoadMorePostsResponse, LoadPostOption } from "./post.types";
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
