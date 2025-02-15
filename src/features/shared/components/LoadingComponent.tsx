import Spinner from "./Spinner";

export default function LoadingComponent() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-20">
      <Spinner />
    </div>
  );
}
