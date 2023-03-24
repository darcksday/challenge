import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GelatoTxContext } from "../context/GelatoTxContext";

export const DialogModal = () => {
  const [open, setOpen] = useState(false);
  const { setConfig, config } = useContext(GelatoTxContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    setConfig(prevState => ({ ...prevState, enable: true }));

  };

  useEffect(() => {
    if (config.functionName && !config.enable) {
      setOpen(true)
    }


  }, [config]);


  return (

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Approve transaction"}
      </DialogTitle>
      <DialogContent>
        Do you really want to run the transaction?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
