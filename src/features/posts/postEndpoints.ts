const postEndpoints = {
  create: "/api/posts",
  read: (id: number) => `/api/posts/${id}`,
  prevAndNext: (id: number) => `/api/posts/prev-and-next?postId=${id}`,
  delete: (id: number) => `/api/posts/${id}`,
  update: (id: number) => `/api/posts/${id}`,
  loadPosts: `/api/posts`,
  searchPosts: "/api/posts/search",
};

export default postEndpoints;
