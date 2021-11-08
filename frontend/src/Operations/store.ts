import { createStore, createEvent, createEffect } from "effector";
import { Operation } from "./interfaces/Operations";
import { OperationsService } from "./services/OperationsServices";

export const addOperation = createEvent<Operation>();
export const addOperations = createEvent<Operation[]>();
export const resetOperations = createEvent();
export const updateOrAddOperation = createEvent<Operation>();


const sortOpeartionsByName = (operations: Operation[]): Operation[] =>
  operations.sort((lhs: Operation, rhs: Operation) => {
    if (lhs.name > rhs.name) {
      return 1;
    }
    if (lhs.name < rhs.name) {
      return -1;
    }

    return 0;
  });

export const updateOrAddOperationHandler = (
  state: Operation[],
  newOperation: Operation
): Operation[] => {
  let wasElementFound: boolean = false;

  const updatedState = state.map((oldOperation: Operation) => {
    if (oldOperation.id === newOperation.id) {
      wasElementFound = true;

      return newOperation;
    }

    return oldOperation;
  });

  return wasElementFound ? updatedState : sortOpeartionsByName([...state, newOperation]);
};

export const fetchAllOperations = createEffect(async () => {
  const operations = await new OperationsService(
    "http://localhost",
    8000
  ).fetchAllOperations();
  return operations;
});

export const operationsStore = createStore<Operation[]>([])
  .on(addOperation, (state, operation) => sortOpeartionsByName([...state, operation]))
  .on(addOperations, (state, operations) => sortOpeartionsByName([...state, ...operations]))
  .on(updateOrAddOperation, updateOrAddOperationHandler)
  .on(fetchAllOperations.doneData, (_, operations) => sortOpeartionsByName([...operations]))
  .reset(resetOperations);
