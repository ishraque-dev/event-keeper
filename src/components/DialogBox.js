import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { getDatabase, ref, update } from 'firebase/database';
const DialogBox = ({
  handleClose,
  handleClickOpen,
  open,
  setValue,
  submitHandler,
  formattedDate,
  value,
  isIsEditing,
  getUpdated,

  itemId,
  userId,
}) => {
  const db = getDatabase();
  const [inputValue, setInputValue] = useState();
  const updateHandler = () => {
    update(ref(db, `items/${userId}/${itemId}/value`), {
      value: inputValue,
    });
    handleClose();
  };
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
            {isIsEditing ? (
              <TextField
                placeholder="edit"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            ) : (
              <TextField
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            )}
          </div>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitHandler}>Add</Button>
            <Button onClick={updateHandler}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DialogBox;
