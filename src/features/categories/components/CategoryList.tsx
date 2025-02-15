import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import QueryGuard from "../../shared/components/QueryGuard";
import SnackbarAlert from "../../shared/components/SnackbarAlert";
import { useSnackbarState } from "../../shared/hooks/useSnackbarState";
import { TargetedEvent } from "../../shared/shared.types";

import { CategoryListData } from "../category.types";
import { useDeleteCategoryMutation, useMyCategory } from "../useCategory";

export default function CategoryListPageGuard() {
  const query = useMyCategory();

  return <QueryGuard query={query} Component={CategoryListPage} />;
}

function CategoryListPage({ data }: { data: CategoryListData }) {
  const { categories } = data;
  const navigate = useNavigate();

  const { closeSnackbar, displaySnackbar, snackbarState } = useSnackbarState();
  const mutation = useDeleteCategoryMutation({
    setErrorMessage: displaySnackbar,
  });

  const handleCategoryLink = ({ currentTarget }: TargetedEvent) => {
    const id = parseInt(currentTarget.dataset.id as string);
    navigate(`/posts/categories/${id}`);
  };

  const handleDelete = async ({ currentTarget }: TargetedEvent) => {
    const id = parseInt(currentTarget.dataset.id as string);

    const isConfirmed = confirm("Delete empty category?");

    try {
      if (isConfirmed && !mutation.isPending) {
        await mutation.mutateAsync(id);
        displaySnackbar("Category Deleted", "success");
      }
    } catch {
      mutation.reset();
    }
  };

  const isEmpty = categories.length === 0;

  return (
    <div className="mx-auto w-11/12">
      {isEmpty ? (
        <div className="w-full min-h-[20vh] flex items-center justify-center text-teal-700">
          No results
        </div>
      ) : (
        <ul className="flex flex-col justify-center items-center p-8">
          {categories.map((category) => (
            <li
              key={category.id}
              className={
                "w-full text-lg text-base-content  text-ellipsis flex flex-row justify-between group p-1"
              }
            >
              <div className="flex flex-row items-center gap-2 w-full">
                <h2
                  className={clsx(
                    "flex-grow-0 max-w-56 select-none  overflow-clip text-ellipsis break-words whitespace-nowrap ",
                    "group-hover:underline cursor-pointer"
                  )}
                  data-id={category.id}
                  onClick={
                    category.postCount > 0 ? handleCategoryLink : handleDelete
                  }
                >
                  {category.categoryName}
                </h2>
              </div>
              <span className="text-sm text-base-content/50">
                ({category.postCount})
              </span>
            </li>
          ))}
        </ul>
      )}

      <SnackbarAlert onClose={closeSnackbar} snackbarState={snackbarState} />
    </div>
  );
}
