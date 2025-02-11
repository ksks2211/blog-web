import { ApiResponse } from "./../shared/shared.types";
export interface PostPreview {
  id: number;
  authorId: string;
  title: string;
  description: string;
  writerName: string;
  createdAt: string;
  updatedAt: string;
}

export type LoadPostOption = "older" | "newer";

export type LoadMorePostsData = {
  targetPostId: number;
  load: LoadPostOption;
  postList: PostPreview[];
  hasMore: boolean;
};

export type LoadMorePostsResponse = ApiResponse<LoadMorePostsData>;
