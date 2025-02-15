import type { FallbackProps } from "react-error-boundary";
import { getTokenFromBrowser } from "../../auth/authTokenService";
import { useLogout } from "../../auth/useAuth";
import HttpError from "../HttpError";

export default function FallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const { logout } = useLogout();

  let errorName = "Unknown Error";
  if (error instanceof Error) {
    console.log(`${error.name} : ${error.message}`);
    errorName = error.name;
  }

  console.log(error);

  if (error instanceof HttpError) {
    if (error.statusCode === 401 && getTokenFromBrowser() === null) {
      alert("Login session expired");
      logout();
    }
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
