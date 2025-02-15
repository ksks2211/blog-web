export type TargetedEvent = { currentTarget: EventTarget & HTMLElement };

export interface ApiResponse<T = undefined> {
  status: "success" | "failure";
  data: T;
  meta: {
    timestamp: string;
  };
}

export type PageData = {
  totalPages: number;
  pageNumber: number;
  totalElements: number;
  firstPage: boolean;
  hasPrevPage: boolean;
  lastPage: boolean;
  hasNextPage: boolean;
};
