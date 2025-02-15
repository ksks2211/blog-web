import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { TargetedEvent } from "../../shared/shared.types";
import { usePrevAndNextPost } from "../usePost";

const wrapperCls = "h-24 mt-8 flex justify-center";
const btnGroupCls = "w-full h-full flex flex-row shadow-sm rounded-xl";
const btnBasicCls =
  "transition text-nowrap text-ellipsis overflow-hidden group basis-1/2 border-[1px] px-4 relative ";
const inactiveBtnCls = "bg-neutral/50 text-base-100 text-gray-300";
const activeBtnCls = "border-gray-300 bg-gray-200/50 hover:opacity-80";
const descSpanCls =
  "absolute top-3 font-extrabold left-0 right-0 -translate-y-1/4";

export default function PrevAndNextBtns({ postId }: { postId: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { data, isError, isLoading } = usePrevAndNextPost({
    postId,
    enabled: inView,
  });
  const navigate = useNavigate();

  const isVisible = inView && !isError && !isLoading && data !== undefined;

  const handlePrevAndNextBtn = ({ currentTarget }: TargetedEvent) => {
    const link = currentTarget.dataset.link as string;
    navigate(link);
  };

  return (
    <div ref={ref} className={wrapperCls}>
      {isVisible ? (
        <div className={btnGroupCls}>
          <button
            className={clsx(
              btnBasicCls,
              "rounded-l-xl",
              data.hasPrev ? activeBtnCls : inactiveBtnCls
            )}
            disabled={!data.hasPrev || data.prev === undefined}
            data-link={`/posts/${data.prev?.id}`}
            onClick={handlePrevAndNextBtn}
          >
            <span>{data.hasPrev ? data.prev.title : "None"}</span>

            <span className={clsx(descSpanCls)}>PREV</span>
          </button>

          <button
            className={clsx(
              btnBasicCls,
              "rounded-r-xl relative",
              data.hasNext ? activeBtnCls : inactiveBtnCls
            )}
            disabled={!data.hasNext || data.next === undefined}
            data-link={`/posts/${data.next?.id}`}
            onClick={handlePrevAndNextBtn}
          >
            <span>{data.hasNext ? data.next.title : "None"}</span>

            <span className={clsx(descSpanCls)}>NEXT</span>
          </button>
        </div>
      ) : (
        <div className="w-11/12 h-full skeleton"></div>
      )}
    </div>
  );
}
