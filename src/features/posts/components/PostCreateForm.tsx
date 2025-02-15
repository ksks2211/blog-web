import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChangeHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { CategoryListData } from "../../categories/category.types";
import SnackbarAlert from "../../shared/components/SnackbarAlert";
import { useSnackbarState } from "../../shared/hooks/useSnackbarState";
import { useCreatePostMutation, useUpdatePostMutation } from "../usePost";
import Chip from "./Chip";
import MarkdownRenderer from "./MarkdownRenderer";

const tagSchema = z.string().max(30, "Tag too long").trim();

const postCreateSchema = z.object({
  title: z.string().nonempty("Title can't be empty"),
  tags: z.array(tagSchema),
  content: z.string().nonempty("Content can't be empty"),
  categoryId: z.number().int().optional(),
});

export type PostCreateFormData = z.infer<typeof postCreateSchema>;

const defaultFormValue = {
  title: "",
  tags: [],
  categoryId: undefined,
  content: "",
};

function useIsUpdate() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const isUpdate = pathname.startsWith("/posts/update");

  return { isUpdate, id };
}

export default function PostCreateForm({
  defaultValues = defaultFormValue,
  data: { categories },
}: {
  defaultValues?: PostCreateFormData;
  data: CategoryListData;
}) {
  // console.log(defaultValues);

  const {
    handleSubmit,
    reset,
    register,
    getValues,
    watch,
    setValue,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm<PostCreateFormData>({
    resolver: zodResolver(postCreateSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const { closeSnackbar, displaySnackbar, snackbarState } = useSnackbarState();

  const { isUpdate, id } = useIsUpdate();

  const createMutation = useCreatePostMutation({
    setSnackbarMessage: displaySnackbar,
  });

  const updateMutation = useUpdatePostMutation({
    setSnackbarMessage: displaySnackbar,
  });

  const handleCreate = async (data: PostCreateFormData) => {
    if (!createMutation.isPending) {
      try {
        await createMutation.mutateAsync(data);
      } catch {
        clearErrors();
        setTimeout(() => {
          setFocus("title");
          reset(getValues());
        }, 500);
      }
    }
  };

  const handleUpdate = async (data: PostCreateFormData) => {
    if (!updateMutation.isPending) {
      try {
        await updateMutation.mutateAsync({
          ...data,
          id: parseInt(id as string),
        });
      } catch {
        clearErrors();
        setTimeout(() => {
          setFocus("title");
          reset(getValues());
        }, 500);
      }
    }
  };

  const onSubmit = async (data: PostCreateFormData) => {
    if (isUpdate) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  useEffect(() => {
    if (errors.title || errors.categoryId || errors.tags || errors.content) {
      const message =
        errors.title?.message ||
        errors.categoryId?.message ||
        errors.tags?.message ||
        errors.content?.message ||
        "Invalid input";
      displaySnackbar(message);

      clearErrors();
      reset(getValues());
    }
  }, [
    clearErrors,
    displaySnackbar,
    errors.categoryId,
    errors.content,
    errors.tags,
    errors.title,
    getValues,
    reset,
  ]);

  const tags = watch("tags");
  const [tagInput, setTagInput] = useState("");
  const [preview, setPreview] = useState(false);

  const addTag = () => {
    try {
      const parsedTag = tagSchema.parse(tagInput);
      if (tags.includes(parsedTag)) {
        setTagInput("");
        return;
      }

      setValue("tags", [...tags, parsedTag]);

      setTagInput("");
    } catch (e) {
      console.log(e);
    }

    console.log(getValues());
  };

  const removeTag = (idx: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== idx)
    );
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.currentTarget.value);
  };

  const handleKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const rowCls = "w-full flex flex-row min-h-12 border-b-2 border-sky-300 ";

  const labelCls =
    "w-24 flex-grow-0 text-md font-extrabold text-sky-700 flex items-center justify-center";

  const onCategoryChange: ChangeHandler = async (e) => {
    if (e.target.value === "none") {
      setValue("categoryId", undefined);
    } else {
      setValue("categoryId", parseInt(e.target.value));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  border-2 border-sky-300 md:m-10 lg:m-16"
    >
      <div className={rowCls}>
        <label className={labelCls}>Title</label>
        <input
          type="text"
          className="flex-grow  active:outline-none focus:outline-none"
          placeholder="Title of Post"
          {...register("title")}
        />
      </div>

      <div className={clsx(rowCls)}>
        <label className={labelCls}>Category</label>
        <select
          className="flex-grow active:outline-none focus:outline-none relative group"
          onChange={onCategoryChange}
          defaultValue={
            defaultValues.categoryId ? defaultValues.categoryId : undefined
          }
        >
          <option value={undefined}>none</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className={clsx("flex flex-col w-full")}>
        <div className="flex min-h-12">
          <label className={labelCls}>Tags</label>
          <input
            type="text"
            className="flex-grow  active:outline-none focus:outline-none"
            placeholder="Add tag & Press enter"
            onKeyDown={handleKeyboard}
            value={tagInput}
            onChange={handleTagInputChange}
            enterKeyHint="enter"
          />
        </div>

        <div
          className={
            "w-full flex flex-row min-h-12 gap-3 items-center justify-center flex-wrap px-10 py-5 border-b-2 border-sky-300"
          }
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              onClick={() => removeTag(index)}
              content={tag}
            ></Chip>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="w-full h-12 flex flex-row border-b-2 border-sky-300">
          <button
            type="button"
            tabIndex={-1}
            className={clsx(
              "flex-auto hover:bg-sky-300 transition-colors",
              !preview && "bg-sky-200"
            )}
            onClick={() => {
              setPreview(false);
              setTimeout(() => setFocus("content"), 100);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            tabIndex={-1}
            className={clsx(
              "flex-auto hover:bg-sky-300 transition-colors",
              preview && "bg-sky-200"
            )}
            onClick={() => setPreview(true)}
          >
            Preview
          </button>
        </div>

        <div className="w-full p-4">
          {preview ? (
            <MarkdownRenderer content={getValues("content")} />
          ) : (
            <textarea
              className="w-full min-h-[50vh] active:outline-none focus:outline-none "
              placeholder="Post Content"
              {...register("content")}
            ></textarea>
          )}
        </div>

        <button
          type="submit"
          className="w-full hover:bg-sky-300 bg-sky-200 h-12 border-t-2 border-sky-300"
        >
          Register
        </button>
      </div>

      <SnackbarAlert onClose={closeSnackbar} snackbarState={snackbarState} />
    </form>
  );
}
