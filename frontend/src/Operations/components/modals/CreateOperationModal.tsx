import React, { PureComponent } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface CreateOperationModalProps {
  isOpened: boolean;
  newOperationName: string;

  handleCloseAction: () => void;
  handleCreateNewOperation: () => void;
  handleChangeNewName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class CreateOperationModal extends PureComponent<
  CreateOperationModalProps,
  Readonly<{}>
> {
  render() {
    const {
      isOpened,
      newOperationName,
      handleChangeNewName,
      handleCloseAction,
      handleCreateNewOperation,
    } = this.props;

    return (
      <Modal
        open={isOpened}
        onClose={handleCloseAction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{ justifyContent: "flex-end" }}
            onClick={handleCloseAction}
          >
            <CloseIcon color="primary" />
          </Button>
          <TextField
            error={newOperationName.length === 0}
            helperText={"Should not be empty"}
            id="standard-basic"
            variant="standard"
            label="Insert a new name"
            value={newOperationName}
            onChange={handleChangeNewName}
          />
          <div className="modal-window_buttons" color="error">
            <Button onClick={handleCloseAction}>Cancel</Button>
            <Button onClick={handleCreateNewOperation}>Create</Button>
          </div>
        </Box>
      </Modal>
    );
  }
}
