export enum OperationsStatus {
  PENDING = "In Progress",
  DONE = "done",
  FAILED = "failed",
}

export interface Operation {
  id: string;
  name: string;
  status: OperationsStatus;
}
