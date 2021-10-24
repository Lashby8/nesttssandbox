import { updateOrAddOperationHandler } from "../store";
import { Operation, OperationsStatus } from "../interfaces/Operations";

test("updateOrAddOperationHandler", () => {
  const state: Operation[] = [
    {
      id: "1",
      name: "a",
      status: OperationsStatus.DONE,
    },
    {
      id: "2",
      name: "b",
      status: OperationsStatus.PENDING,
    },
  ];
  let newState = updateOrAddOperationHandler(state, {
    id: "2",
    name: "b",
    status: OperationsStatus.DONE,
  });

  expect(newState.length === state.length).toBe(true);
  expect(newState[1].id === state[1].id).toBe(true);
  expect(newState[1].name === state[1].name).toBe(true);
  expect(newState[1].status === OperationsStatus.DONE).toBe(true);

  newState = updateOrAddOperationHandler(state, {
    id: "3",
    name: "b",
    status: OperationsStatus.DONE,
  });

  expect(newState.length === state.length + 1).toBe(true);
  expect(newState[newState.length - 1].id === "3").toBe(true);
});
