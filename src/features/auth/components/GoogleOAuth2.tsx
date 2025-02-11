import { Navigate, useSearchParams } from "react-router-dom";
import LoadingPage from "../../shared/pages/LoadingPage";
import { useOAuth2LoginMutation } from "../useAuth";

function GoogleOAuth2() {
  const [params] = useSearchParams();

  const mutation = useOAuth2LoginMutation();

  const { isPending, isError, isSuccess, error } = mutation;

  if (!isPending) {
    mutation.mutate(params);
  }

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  if (isError) {
    const message = encodeURIComponent(error.message);
    return <Navigate to={`/login?error=${message}`} />;
  }

  return <LoadingPage />;
}

export default GoogleOAuth2;
