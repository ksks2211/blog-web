import { UseQueryResult } from "@tanstack/react-query";
import LoadingPage from "../pages/LoadingPage";
import QueryErrorPage from "../pages/QueryErrorPage";

type AnyButDataProps = {
  [key: string]: unknown;
  data: never;
};

type QueryHandlerProps<D, E, P> = {
  query: UseQueryResult<D, E>;
  Component: React.FC<{ data: D } & P>;
} & Omit<P, "data">;

export default function QueryGuard<
  D, // type of query result
  E extends Error = Error,
  P = AnyButDataProps // type of props other than data
>({ query, Component, ...rest }: QueryHandlerProps<D, E, P>) {
  const { isLoading, data, isError } = query;

  if (isLoading) return <LoadingPage />;
  if (isError) return <QueryErrorPage />;
  if (data === undefined) return <QueryErrorPage />;

  return <Component data={data} {...(rest as P)} />;
}
