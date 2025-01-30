import apiClient from "./client";

export async function getRequest<T>(endpoint: string) {
  const { data } = await apiClient.get(endpoint);
  return data as T;
}

export async function deleteRequest<T>(endpoint: string) {
  const { data } = await apiClient.delete(endpoint);
  return data as T;
}
