import React, { useState } from 'react';
import Dustbin from '../components/Dustbin';
import Box from '../components/Box';
import style from '../style/home.module.css';
import DialogBox from '../components/DialogBox';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { compareAsc, format } from 'date-fns';
const myDate = new Date();
const hrs = myDate.getHours();

let greet;

if (hrs < 12) greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';

const Home = () => {
  const [value, setValue] = React.useState(new Date());
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState();
  const [item, setItem] = useState([]);
  const [content, setContent] = useState('');
  const date = value.toString();
  const formattedDate = date.substring(0, 15).replace(' ', ', ');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    if (values === undefined) {
      setAlert(true);
      return;
    }
    let data = { value: values, id: Math.random() * 3, date: formattedDate };
    setItem((pre) => {
      return [...pre, data];
    });
    handleClose();
  };
  const alertHandler = () => {
    setAlert(true);
  };

  let timer = setTimeout(() => {
    setAlert(false);
    console.log('alert');
  }, 3000);
  if (!alert) {
    clearTimeout(timer);
  }
  const getContent = (content) => {
    setContent(content);
  };

  return (
    <>
      {alert && (
        <Stack
          style={{
            margin: '0 auto',
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translate(-50%)',
          }}
          sx={{ width: '30%' }}
          spacing={2}
        >
          <Alert severity="success">
            <AlertTitle>
              {!values ? <p>Please Enter a Event</p> : 'Success'}
            </AlertTitle>
            <strong>{content}</strong>
          </Alert>
        </Stack>
      )}
      <div className={style.home}>
        <div className={style.heading}>
          {<h1>{greet} Ishraque</h1>}
          <p>Write down your tasks </p>
        </div>
        <div className={style.container}>
          <div className={style.dustbin}>
            <Dustbin />
          </div>
          <div className={style.taskItem}>
            <div className={style.addTask}>
              <DialogBox
                submitHandler={submitHandler}
                setValue={setValues}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                formattedDate={formattedDate}
              />
            </div>
            {item.map((i) => {
              return (
                <Box
                  getContent={getContent}
                  onAlert={alertHandler}
                  key={i.id}
                  name={i.value}
                  date={i.date}
                />
              );
            })}
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={value}
              shouldDisableDate={isWeekend}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default Home;
