const postEndpoints = {
  create: "/api/posts",
  read: (id: number) => `/api/posts/${id}`,
  prevAndNext: (id: number) => `/api/posts/prev-and-next?postId=${id}`,
  delete: (id: number) => `/api/posts/${id}`,
  update: (id: number) => `/api/posts/${id}`,
  olderPosts: (id: number) => `/api/posts?postId=${id}&load=older`,
  newerPosts: (id: number) => `/api/posts?postId=${id}&load=newer`,
  searchPosts: "/api/posts/search",
};

export default postEndpoints;
