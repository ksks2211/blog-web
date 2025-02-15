import { ApiResponse } from "../shared/shared.types";

export type Category = {
  id: number;
  categoryName: string;
  postCount: number;
};

export type CategoryCreateResponse = ApiResponse<Category>;

export interface CategoryListData {
  categories: Category[];
}

export type CategoryListResponse = ApiResponse<CategoryListData>;
