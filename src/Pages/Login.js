import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = getAuth();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;
        navigate('/home', { state: { id: userId } });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <div className="input">
          <input
            placeholder="Email"
            htmlFor="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
