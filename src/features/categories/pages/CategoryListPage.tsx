import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import SnackbarAlert from "../../shared/components/SnackbarAlert";
import { useSnackbarState } from "../../shared/hooks/useSnackbarState";
import CategoryList from "../components/CategoryList";
import { useCreateCategoryMutation } from "../useCategory";

export default function CategoryListPage() {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCategory(e.currentTarget.value);
  };

  const { displaySnackbar, closeSnackbar, snackbarState } = useSnackbarState();

  const mutation = useCreateCategoryMutation({
    setErrorMessage: displaySnackbar,
  });

  const handleCategoryAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.length > 0 && !mutation.isPending)
      try {
        await mutation.mutateAsync(category);
        displaySnackbar("New Category registered", "success");
      } catch {
        mutation.reset();
      }
    setCategory("");
  };

  return (
    <div className="flex flex-col pt-12">
      <form
        onSubmit={handleCategoryAdd}
        className="w-2/3 flex flex-row mx-auto mt-16 mb-12 md:w-1/2"
      >
        <input
          type="text"
          placeholder="Add new category"
          value={category}
          onChange={handleCategoryChange}
          className="input input-sm input-success input-bordered w-full mx-5"
          autoFocus
        />
        <button type="submit" tabIndex={-1} className="flex-shrink-0 mr-5">
          <FaPlus className="size-5 text-neutral" />
        </button>
      </form>

      <CategoryList />

      <SnackbarAlert onClose={closeSnackbar} snackbarState={snackbarState} />
    </div>
  );
}
