import { useInView } from "react-intersection-observer";
import LoadingComponent from "./LoadingComponent";

interface LazyMountEnhancerProps {
  children?: React.ReactNode | ((hasMounted: boolean) => React.ReactNode);
  width?: string;
  height?: string;
  threshold?: number;
}

export default function LazyMountEnhancer({
  children,
}: LazyMountEnhancerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  if (typeof children === "function") {
    return <div ref={ref}>{children(inView)}</div>;
  }

  return (
    <div ref={ref} className="w-full min-h-16">
      {inView ? children : <LoadingComponent />}
    </div>
  );
}
