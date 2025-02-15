const categoryEndpoints = {
  create: "/api/categories",
  myCategories: "/api/categories",
  getCategory: (id: number) => `/api/categories/${id}`,
  delete: (id: number) => `api/categories/${id}`,
};

export default categoryEndpoints;
