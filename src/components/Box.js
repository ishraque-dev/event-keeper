import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { getDatabase, ref, remove } from 'firebase/database';
import './box.css';
const style = {
  cursor: 'move',
  padding: '10px 10px',
  backgroundColor: '#6E6D7A',

  marginBottom: '15px',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center,',
};
const Box = function Box({
  itemId,
  userId,
  id,
  name,
  onAlert,
  getContent,
  date,
  setEdit,
  open,
  handelEditing,
  updateHandler,
}) {
  console.log(id);
  const [editing, setEditing] = useState(false);
  const db = getDatabase();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(item);
        onAlert();
        remove(ref(db, `items/${userId}/${itemId}`));
        getContent(`You dropped ${name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  handelEditing(editing);
  const handelEdit = () => {
    setEditing(true);
    setEdit(name);
    open(true);
  };

  return (
    <div ref={drag} className="box" style={{ ...style, opacity }}>
      <div className="icon">
        <BsFillRecordCircleFill />
        <FaEdit onClick={handelEdit} />
        <div className="name"> {name}</div>
        {date}
      </div>
    </div>
  );
};
export default Box;
