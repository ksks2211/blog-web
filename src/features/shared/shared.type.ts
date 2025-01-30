export type Method = "POST" | "GET" | "DELETE" | "PUT";

// const postEndpoints = { getPost : (id)=> `/api/posts/${id}`, getPosts : "/api/posts" }
export type Endpoints = {
  [key: string]: ((id: number | string) => string) | string;
};
