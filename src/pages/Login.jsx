/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [error, setEror] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(false);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      setEror('');
    } catch (e) {
      setEror(e.message);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setIsTyping(false);
    const email = 'emilysofia@gmail.com';
    const password = 'emilysofia';

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEror('');
      navigate('/');
    } catch (e) {
      setEror(e);
      console.log(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[100svh]  w-full flex-col items-center  justify-center gap-3 bg-C_LightBlue text-lg md:h-[40%] md:w-[60%] md:gap-3 md:rounded-xl md:shadow-xl lg:h-[60%] lg:w-[30%]"
    >
      <h2 className="text-xl text-C_TextBlack md:text-2xl lg:text-lg">Login</h2>
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="text"
        placeholder="Email"
        name="id"
      />
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue  md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="password"
        placeholder="Password"
        name="id"
      />
      <button className="rounded-xl bg-C_DarkBlue px-3 py-2 text-2xl text-C_TextWhite shadow-lg md:mt-3 md:text-3xl lg:mt-3 lg:text-xl">
        Login
      </button>
      {!isTyping && error.length > 0 && (
        <span className="text-sm text-red-600 ">
          Either password or email is wrong
        </span>
      )}
      <div className="text-sm">
        {'Demo login? '}
        {/* className="ml-1  text-sm font-bold text-C_DarkBlue" */}
        <button
          className="ml-1  text-sm font-bold text-C_DarkBlue"
          onClick={handleDemoLogin}
        >
          Demo
        </button>
      </div>
      <div className="text-sm">
        You don't have an account?
        <Link
          className="ml-1  text-sm font-bold text-C_DarkBlue"
          to={'/register'}
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
