import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function usePathId(): string {
  const { id } = useParams();
  if (id === undefined) {
    throw new Error(`Id Path Parameter not found`);
  }
  return id;
}

export function usePageParam() {
  const [params] = useSearchParams();
  const page = parseInt(params.get("page") || "1");

  return { page };
}

export function useNavigateToPrevPage() {
  const navigate = useNavigate();

  const navigateToPrevPage = () => {
    try {
      navigate(-1);
    } catch {
      navigate("/");
    }
  };

  return { navigateToPrevPage };
}
