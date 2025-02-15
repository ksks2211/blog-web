import { useNavigate } from "react-router-dom";
import type { TargetedEvent } from "../../shared/shared.types";
import { formatDateFromNow } from "../../shared/utils/dateUtils";
import { PostPreview } from "../post.types";

export default function PostList({ data }: { data: PostPreview[] }) {
  const navigate = useNavigate();

  const handleClickLink = ({ currentTarget }: TargetedEvent) => {
    const link = currentTarget.dataset.link as string;
    navigate(link);
  };

  if (data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh] text-teal-700 font-bold">
        No Result!
      </div>
    );
  }

  return (
    <ul className="w-full flex flex-col gap-2 min-h-[70vh]">
      {data.map((post) => (
        <li
          key={post.id}
          className="relative min-h-36 transition cursor-pointer flex flex-col justify-center px-10 md:px-20 "
          onClick={handleClickLink}
          data-link={`/posts/${post.id}`}
        >
          <h3 className="w-full text-xl font-extrabold overflow-ellipsis md:text-2xl break-words">
            {post.title}
          </h3>
          <p className="mt-1 text-base-content/80">{post.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs">{formatDateFromNow(post.createdAt)}</span>
            <span className="font-bold text-neutral/75">{post.writerName}</span>
          </div>

          <div className="absolute top-full w-11/12 h-[1px] bg-neutral/20 m-auto left-0 right-0 md:w-10/12"></div>
        </li>
      ))}
    </ul>
  );
}
