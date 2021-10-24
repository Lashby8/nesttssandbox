import React from "react";
import renderer from "react-test-renderer";
import OperationsView from "../OperationsView";
import { Operation, OperationsStatus } from "../interfaces/Operations";

test("OperationsView is rendered", () => {
  const operations: Operation[] = [
    {
      id: "1",
      name: "a",
      status: OperationsStatus.DONE,
    },
    {
      id: "2",
      name: "b",
      status: OperationsStatus.FAILED,
    },
  ];
  const component = renderer.create(<OperationsView operations={operations} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
