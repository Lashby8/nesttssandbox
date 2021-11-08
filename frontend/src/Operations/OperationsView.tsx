import React, { PureComponent } from "react";
import { Paper, Button } from "@mui/material";

import { fetchAllOperations } from "./store";
import { CreateOperationModal } from "./components/modals";
import { OperationsTable } from "./components";
import { Operation } from "./interfaces/Operations";
import { OperationsService } from "./services/OperationsServices";

interface OperationsProps {
  operations: Operation[];
}

interface OperationsState {
  isModalOpen: boolean;
  isInputInvalid: boolean;
  newOperationName: string;
}

const InitialState: OperationsState = {
  isModalOpen: false,
  isInputInvalid: false,
  newOperationName: "",
}

export default class OperationsView extends PureComponent<
  OperationsProps,
  OperationsState
> {
  constructor(props: OperationsProps) {
    super(props);

    this.state = InitialState;
  }

  public async componentDidMount() {
    try {
      await fetchAllOperations();
    } catch (e) {
      console.error(e);
      return;
    }
  }

  public render() {
    const { operations } = this.props;
    const { isModalOpen, isInputInvalid, newOperationName } = this.state;

    return (
      <Paper
        elevation={6}
        style={{
          height: "95vh",
          width: "95vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          marginLeft: "3vw",
          marginTop: "3vh",
        }}
      >
        <Button onClick={this.handleOpenCreateOperationModal}>Create</Button>
        <CreateOperationModal
          isOpened={isModalOpen}
          isInputInvalid={isInputInvalid}
          handleCloseAction={this.handleCloseCreteOperationModal}
          handleCreateNewOperation={async () => {
            try {
              if (newOperationName.length === 0) {
                this.setState({ isInputInvalid: true })
                return;
              }

              await this.handleCreateNewOperation(newOperationName);
              await fetchAllOperations();
              this.handleCloseCreteOperationModal();
              this.setState({ newOperationName: "" });
            } catch (e) {
              console.error(e);
            }
          }}
          newOperationName={newOperationName}
          handleChangeNewName={this.handleChangeNewName}
        />
        <OperationsTable operations={operations} />
      </Paper>
    );
  }

  private handleOpenCreateOperationModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  private handleCloseCreteOperationModal = () => {
    this.setState({
     ...InitialState
    });
  };

  handleChangeNewName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newName: string = event.target.value;

    this.setState({
      newOperationName: newName,
      isInputInvalid: newName.length === 0,
    });
  };

  private async handleCreateNewOperation(newName: string): Promise<Operation | undefined> {
    try {
      const operation = await new OperationsService(
        "http://localhost",
        8000
      ).createOperation(newName);
      return operation;
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
