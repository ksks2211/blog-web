export type TargetedEvent = { currentTarget: EventTarget & HTMLElement };

export interface ApiResponse<T = undefined> {
  status: "success" | "failure";
  data: T;
  meta: {
    timestamp: string;
  };
}
