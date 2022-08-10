import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
const DialogBox = ({
  handleClose,
  handleClickOpen,
  open,
  setValue,
  submitHandler,
  formattedDate,
}) => {
  return (
    <div>
      {' '}
      <Button
        style={{ marginBottom: '20px' }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add a Event
      </Button>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <h4 style={{ padding: '10px' }}>Add a task</h4>
          <div style={{ padding: '10px' }}>
            <p>
              <h2> On: {formattedDate}</h2>
              To add a task just write your task and hit enter or add button.
            </p>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add a task"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitHandler}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DialogBox;
