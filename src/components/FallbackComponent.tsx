import type { FallbackProps } from "react-error-boundary";

export default function FallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let errorName = "Unknown Error";
  if (error instanceof Error) {
    console.log(`${error.name} : ${error.message}`);
    errorName = error.name;
  }

  const handleRetry = () => {
    resetErrorBoundary();
  };

  return (
    <div>
      <h1>{errorName}</h1>
      <p>Something went wrong!</p>
      <button onClick={handleRetry}>Try again</button>
    </div>
  );
}
