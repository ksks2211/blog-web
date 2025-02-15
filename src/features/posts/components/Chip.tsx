import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export default function Chip({ content, ...props }: ChipProps) {
  return (
    <div
      className="px-4 py-1.5 inline-flex bg-slate-200 rounded-full text-sm select-none cursor-pointer text-emerald-700 hover:opacity-75"
      {...props}
    >
      {content}
    </div>
  );
}
