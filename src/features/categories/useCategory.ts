import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryListData } from "./category.types";
import {
  deleteCategory,
  getCategories,
  getCategory,
  postCreateCategory,
} from "./categoryService";

export const useMyCategory = (page = 1) => {
  return useQuery<CategoryListData>({
    queryKey: ["categories", { page }],
    queryFn: () => getCategories(),
  });
};

export const useCreateCategoryMutation = ({
  setErrorMessage,
}: {
  setErrorMessage: (v: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e) => {
      setErrorMessage(e.message);
    },
  });
};

export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", { id }],
    queryFn: () => getCategory(id),
  });
};

export const useDeleteCategoryMutation = ({
  setErrorMessage,
}: {
  setErrorMessage?: (v: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e) => {
      if (setErrorMessage) {
        setErrorMessage(e.message);
      }
    },
  });
};
