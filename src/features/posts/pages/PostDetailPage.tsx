import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserId } from "../../auth/useAuth";
import LazyMountEnhancer from "../../shared/components/LazyMountEnhancer";
import QueryGuard from "../../shared/components/QueryGuard";
import {
  useNavigateToPrevPage,
  usePathId,
} from "../../shared/hooks/useAddress";
import { formatDate } from "../../shared/utils/dateUtils";
import Chip from "../components/Chip";
import GiscusComments from "../components/GiscusComments";
import MarkdownRenderer from "../components/MarkdownRenderer";
import PrevAndNextBtns from "../components/PrevAndNextBtns";
import { PostDetailData } from "../post.types";
import { useDeletePostMutation, useGetPostDetail } from "../usePost";

type PostMetadataProps = Omit<
  PostDetailData,
  "content" | "description" | "tags"
>;

function PostMetadata({
  createdAt,
  updatedAt,
  authorId,
  category,
  writerName,
}: PostMetadataProps) {
  return (
    <div aria-label="post metadata" className="flex flex-col gap-1">
      <section className="text-xs">
        <time className="after:content-['•'] after:mx-2">
          <label className="text-gray-500 pr-2">Posted</label>
          {formatDate(createdAt)}
        </time>
        <time>
          <label className="text-gray-500 pr-2">Last Updated</label>
          {formatDate(updatedAt)}
        </time>
      </section>
      <section className="text-xs flex flex-row justify-between">
        <div data-author-id={authorId}>
          <label className="pr-2 text-gray-500">Writer</label>
          {writerName}
        </div>

        <div>
          <label className="pr-2 text-gray-500">Category</label>
          {category != null ? category : "null"}
        </div>
      </section>

      <div>{category}</div>
    </div>
  );
}

const titleStyle = {
  textShadow: "0px 1px 1px black",
  wordBreak: "break-word",
} as const;

function PostDetailPage({ data }: { data: PostDetailData }) {
  const postId = parseInt(usePathId());
  const mutation = useDeletePostMutation();
  const { navigateToPrevPage } = useNavigateToPrevPage();
  const navigate = useNavigate();
  const { userId } = useUserId();

  const isMyPost = userId === data.authorId;

  const handleEditPost = () => {
    if (!isMyPost) return;
    navigate(`/posts/update/${postId}`);
  };

  // mutation
  const handleDeletePost = async () => {
    if (!isMyPost) return;

    const isConfirmed = window.confirm("Delete Post?");

    if (isConfirmed && !mutation.isPending) {
      try {
        await mutation.mutateAsync(postId);
        window.alert("Deleted!");
        navigateToPrevPage();
      } catch {
        window.alert("Delete failed. Try later");
      }
    }
  };

  return (
    <div className="w-full h-full px-7 pt-3 lg:px-20 lg:pt-10">
      <div className="w-full flex flex-row my-3">
        <h1
          className="flex-grow text-3xl font-extrabold basis-4/5 break-words"
          style={titleStyle}
        >
          {data.title}
        </h1>
        {isMyPost && (
          <div className="flex-grow-0 flex-shrink-0  basis-16 flex items-end justify-around pb-3">
            <FaPen
              className="size-5 text-success cursor-pointer"
              onClick={handleEditPost}
            />
            <MdDelete
              className="size-5 text-error scale-125 cursor-pointer"
              onClick={handleDeletePost}
            />
          </div>
        )}
      </div>

      <PostMetadata {...data} />

      <div className="divider"></div>
      <MarkdownRenderer content={data.content} />
      <TagSection tags={data.tags} />
      <PrevAndNextBtns postId={postId} />

      <LazyMountEnhancer>
        <GiscusComments postId={postId} />
      </LazyMountEnhancer>
    </div>
  );
}

function TagSection({ tags }: { tags: string[] }) {
  return (
    <div className="w-full flex flex-wrap-reverse gap-2 flex-row-reverse mt-10">
      {tags.map((tag) => (
        <Chip content={tag} key={tag} />
      ))}
    </div>
  );
}

function PostDetailGuard() {
  const postId = parseInt(usePathId());
  const query = useGetPostDetail(postId);
  return <QueryGuard query={query} Component={PostDetailPage} />;
}

export default PostDetailGuard;
