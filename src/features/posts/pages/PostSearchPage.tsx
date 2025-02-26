import { includes } from "lodash-es";
import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { useScrollTopResetByParams } from "../../scroll/useScroll";
import { QueryGuardWithSkeleton } from "../../shared/components/QueryGuard";
import { TargetedEvent } from "../../shared/shared.types";
import Chip from "../components/Chip";
import PostList from "../components/PostList";
import { PostPageData, PostSearchParams } from "../post.types";
import { useSearchPosts } from "../usePost";

function Skeleton() {
  return (
    <div className="mt-10 flex flex-col gap-8 md:mx-20">
      <div className="skeleton h-32 w-5/6 mx-auto"></div>
      <div className="skeleton h-32 w-5/6 mx-auto"></div>
    </div>
  );
}

function PostSearchResultGuard(params: PostSearchParams) {
  const enabled = params.tags.length > 0;
  const query = useSearchPosts({ ...params, enabled });

  if (!enabled) return <div />;

  return (
    <QueryGuardWithSkeleton
      query={query}
      Component={PostSearchResult}
      Skeleton={Skeleton}
      page={params.page}
    />
  );
}

export function PostSearchResult({
  data,
  page,
}: {
  data: PostPageData;
  page: number;
}) {
  const [, setParams] = useSearchParams();
  useScrollTopResetByParams();

  const { postList, hasNextPage, hasPrevPage, pageNumber } = data;

  const handleBtnClick = ({ currentTarget }: TargetedEvent) => {
    const targetPage = currentTarget.dataset.page as string;
    setParams((prev) => {
      prev.delete("page");
      prev.append("page", targetPage);
      return prev;
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <PostList data={postList} />

      <div className="join mx-auto mt-10">
        <button
          className={clsx("join-item btn", !hasPrevPage && "btn-disabled")}
          data-page={pageNumber - 1}
          onClick={hasPrevPage ? handleBtnClick : undefined}
        >
          ‹
        </button>
        <button className="join-item btn">Page {page}</button>
        <button
          className={clsx("join-item btn", !hasNextPage && "btn-disabled")}
          data-page={pageNumber + 1}
          onClick={hasNextPage ? handleBtnClick : undefined}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function PostSearchPage() {
  const [params] = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const [mineOnly, setMineOnly] = useState(false);
  const [tag, setTag] = useState("");
  const page = parseInt(params.get("page") || "1");

  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tag.length > 0 && !includes(tags, tag)) {
      setTags((prev) => [...prev, tag]);
    }
    setTag("");
    e.currentTarget.reset();
    e.currentTarget.focus();
  };

  const getTagDeleteFunction = (tag: string) => () => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagDeleteFunctions = tags.map(getTagDeleteFunction);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.currentTarget.value);
  };

  const handleMineOnlyCheckbox = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setMineOnly(currentTarget.checked);
  };

  const checkboxLabel = mineOnly ? "Only my posts" : "All posts";

  return (
    <div className="flex flex-col pt-12">
      <div className="flex flex-row justify-end pr-5 md:pr-24">
        <label className="label cursor-pointer">
          <span className="label-text mr-3 font-bold">{checkboxLabel}</span>
          <input
            type="checkbox"
            className="toggle toggle-info"
            checked={mineOnly}
            onChange={handleMineOnlyCheckbox}
          />
        </label>
      </div>
      <form
        onSubmit={handleAddTag}
        className="w-2/3 flex flex-row mx-auto mt-16 mb-12 md:w-1/2"
      >
        <input
          type="text"
          placeholder="Add Search Tag"
          value={tag}
          onChange={handleTagInput}
          className="input input-sm input-info input-bordered w-full mx-5"
          autoFocus
        />
        <button type="submit" tabIndex={-1} className="flex-shrink-0 mr-5">
          <FaPlus className="size-5 text-green-900" />
        </button>
      </form>
      <div className="flex gap-2 w-2/3 mx-auto flex-wrap justify-center mb-6">
        {tags.map((t, i) => (
          <Chip key={t} onClick={handleTagDeleteFunctions[i]} content={t} />
        ))}
      </div>

      <PostSearchResultGuard mineOnly={mineOnly} page={page} tags={tags} />
    </div>
  );
}
