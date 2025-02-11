import apiClient from "./client";

export async function getRequest<ResBody>(
  endpoint: string,
  params?: URLSearchParams
) {
  const { data } = await apiClient.get(endpoint, {
    params,
  });
  return data as ResBody;
}

export async function deleteRequest<ResBody>(endpoint: string) {
  const { data } = await apiClient.delete(endpoint);
  return data as ResBody;
}

export async function postRequest<ReqBody = void, ResBody = void>(
  endpoint: string,
  reqBody?: ReqBody
) {
  const { data } = await apiClient.post(endpoint, reqBody);
  return data as ResBody;
}
