export interface ApiResponse<T = undefined> {
  status: "success" | "failure";
  data: T;
  meta: {
    timestamp: string;
  };
}
