import React from "react";
import renderer from "react-test-renderer";
import CreateOperationModal, {
  CreateOperationModalProps,
} from "../modals/CreateOperationModal";

test("Closed CreateOperationModal", () => {
  const createOpModalProps: CreateOperationModalProps = {
    isOpened: false,
    handleCloseAction: jest.fn(),
    handleCreateNewOperation: jest.fn(),
    newOperationName: "",
    handleChangeNewName: jest.fn(),
  };
  const component = renderer.create(
    <CreateOperationModal {...createOpModalProps} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Opened CreateOperationModal", () => {
  const createOpModalProps: CreateOperationModalProps = {
    isOpened: false,
    handleCloseAction: jest.fn(),
    handleCreateNewOperation: jest.fn(),
    newOperationName: "This is totally new opeartion",
    handleChangeNewName: jest.fn(),
  };
  const component = renderer.create(
    <CreateOperationModal {...createOpModalProps} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
