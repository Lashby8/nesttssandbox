import React from "react";
import renderer from "react-test-renderer";
import OperationsTable from "../OperationsTable";
import { Operation, OperationsStatus } from "../../interfaces/Operations";

test("OperationsTable is rendered", () => {
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
  const component = renderer.create(
    <OperationsTable operations={operations} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Empty OperationsTable", () => {
  const operations: Operation[] = [];

  const component = renderer.create(
    <OperationsTable operations={operations} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
