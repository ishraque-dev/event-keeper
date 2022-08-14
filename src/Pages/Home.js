import React, { useState, useEffect } from 'react';
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

import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
const myDate = new Date();
const hrs = myDate.getHours();

let greet;

if (hrs < 12) greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening';

const Home = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(new Date());
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState();
  const [edit, setEdit] = useState();
  const [item, setItem] = useState([]);
  const [itemId, setItemId] = useState();
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isIsEditing, setIsEditing] = useState(false);
  const date = value.toString();
  const formattedDate = date.substring(0, 15).replace(' ', ', ');

  const db = getDatabase();

  const userId = location.state.id;
  console.log(userId);
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
    set(push(ref(db, 'items/' + userId)), {
      value: { value: values, id: Math.random() * 3, date: formattedDate },
    });
    setIsEditing(false);
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
  const handelEditing = (editing) => {
    setIsEditing(editing);
  };
  const getUpdated = (val) => {
    console.log(val);
  };
  const updateHandler = () => {};
  useEffect(() => {
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setUserData(data);
    });
  }, [db, userId]);
  useEffect(() => {
    setIsLoading(true);
    const starCountRef = ref(db, 'items/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let array = [];
      let arr2 = [];
      for (const key in data) {
        const id = key;
        const value = data[key];
        array.push({ ...value, id });
      }
      array.forEach((item) => {
        arr2.push(item.value);
        setItemId(item.id);
      });
      setItem(arr2);
      setIsLoading(false);
    });
  }, [db, userId]);

  console.log(userData);
  console.log(item);
  console.log(edit);

  const userName = userData?.username;
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
          {
            <h1>
              {greet} {userName}
            </h1>
          }
          <p>Write down your Events </p>
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
                value={edit}
                isIsEditing={isIsEditing}
                getUpdated={getUpdated}
                updateHandler={updateHandler}
                itemId={itemId}
                userId={userId}
              />
            </div>
            {isLoading && <Loader />}
            {item?.length === 0 && !isLoading && <h2>Nothing to display</h2>}
            {item?.map((i) => {
              return (
                <Box
                  setEdit={setEdit}
                  handleClose={handleClose}
                  open={setOpen}
                  userId={userId}
                  itemId={itemId}
                  getContent={getContent}
                  onAlert={alertHandler}
                  key={i.id}
                  id={i.id}
                  name={i.value}
                  date={i.date}
                  handelEditing={handelEditing}
                  updateHandler={updateHandler}
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
