import { clsx } from "clsx";

const Overlay = ({
  active,
  className,
  ...rest
}: { active: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
  const isScrollable = document.body.scrollHeight > window.innerHeight;

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black bg-opacity-30 z-10",
        active ? "pointer-events-auto" : "pointer-events-none",
        active ? "animate-fade-in" : "animate-fade-out",
        active && isScrollable ? "overflow-y-scroll" : "overflow-y-auto",
        className
      )}
      {...rest}
    />
  );
};

export default Overlay;
