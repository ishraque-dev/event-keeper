import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { getDatabase, ref, set } from 'firebase/database';
import '../style/signUp.css';
import { useNavigate, Link } from 'react-router-dom';
const SignUp = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const submitHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
        });
        // ...

        navigate('/home', { state: { id: userId } });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        // ..
      });
  };
  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1 style={{ color: 'white' }}>Welcome to Event keeper</h1>
          <p style={{ textAlign: 'center', color: 'white' }}>
            Please signup or login to continue.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="input">
            <label
              htmlFor="name"
              style={{ color: 'white', marginRight: '4px' }}
            >
              Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="input">
            <label
              htmlFor="email"
              style={{ color: 'white', marginRight: '4px' }}
            >
              Email
            </label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <label
              htmlFor="password"
              style={{ color: 'white', marginRight: '4px' }}
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button>Sign Up</button>
          <p>
            Already have an account?{' '}
            <strong>
              <Link to="/login">Login</Link>
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
