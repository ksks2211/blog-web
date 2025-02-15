import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../shared/httpRequestService";
import { ApiResponse } from "../shared/shared.types";
import { CategoryCreateResponse, CategoryListResponse } from "./category.types";
import categoryEndpoints from "./categoryEndpoints";

export async function getCategories() {
  return getRequest<CategoryListResponse>(categoryEndpoints.myCategories).then(
    (res) => res.data
  );
}

export async function getCategory(id: number) {
  return getRequest<CategoryCreateResponse>(
    categoryEndpoints.getCategory(id)
  ).then((res) => res.data);
}

export async function postCreateCategory(categoryName: string) {
  return postRequest<{ categoryName: string }, CategoryCreateResponse>(
    categoryEndpoints.create,
    { categoryName }
  ).then((res) => res.data);
}

export async function deleteCategory(id: number) {
  return deleteRequest<ApiResponse>(categoryEndpoints.delete(id));
}
