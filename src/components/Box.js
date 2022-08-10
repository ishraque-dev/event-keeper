import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

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
const Box = function Box({ name, onAlert, getContent, date }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAlert();
        getContent(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} className="box" style={{ ...style, opacity }}>
      <div className="icon">
        <BsFillRecordCircleFill />
        <FaEdit />
        <div className="name"> {name}</div>
        {date}
      </div>
    </div>
  );
};
export default Box;
