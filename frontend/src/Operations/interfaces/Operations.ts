export enum OperationsStatus {
  PENDING = "pending",
  DONE = "done",
  FAILED = "failed",
}

export interface Operation {
  id: string;
  name: string;
  status: OperationsStatus;
}
