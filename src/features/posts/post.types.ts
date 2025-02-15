import { ApiResponse, PageData } from "./../shared/shared.types";
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

export type PostDetailData = {
  id: number;
  authorId: string;
  title: string;
  description: string;
  writerName: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  tags: string[];
  category?: string;
  categoryId?: number;
};

export type PostDetailResponse = ApiResponse<PostDetailData>;

export type PostDeleteResponse = ApiResponse<{ id: number }>;

type NextPost =
  | { next: PostPreview; hasNext: true }
  | { next?: never; hasNext: false };

type PrevPost =
  | { prev: PostPreview; hasPrev: true }
  | { prev?: never; hasPrev: false };

export type PrevAndNextPost = NextPost & PrevPost;

export type PostPrevAndNextResponse = ApiResponse<PrevAndNextPost>;

export interface PostPageData extends PageData {
  postList: PostPreview[];
}

export type PostPageResponse = ApiResponse<PostPageData>;

export type PostSearchParams = {
  mineOnly: boolean;
  tags: string[];
  page: number;
};
