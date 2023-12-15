import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(false);

    //data from the form
    const fname = e.target[0].value;
    const sname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const file = e.target[4].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, fname);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log('There  was a failure on the upload\n ERROR: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //updating user profile
            await updateProfile(res.user, {
              displayName: fname,
              photoURL: downloadURL,
            });

            //adding the user to the users collection
            try {
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                firstName: fname,
                secondName: sname,
                email,
                photoURL: downloadURL,
              });
            } catch (e) {
              console.log(e);
            }

            try {
              await setDoc(doc(db, 'userChats', res.user.uid), {});

              // Navigate to the home page after creating the userChat document
              navigate('/');
            } catch (e) {
              console.log('Adding user chat to firestore error:\n', e);
            }
          });
        },
      );
    } catch (e) {
      setError(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[100svh] w-full flex-col items-center  justify-center gap-3 bg-C_LightBlue text-lg md:h-[50%] md:w-[60%] md:gap-3 md:rounded-xl md:shadow-xl  lg:h-[70%] lg:w-[30%] "
    >
      <h2 className="text-xl text-C_TextBlack md:text-2xl lg:text-lg">
        Register
      </h2>
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="text"
        placeholder="First Name"
        name="id"
      />
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="text"
        placeholder="Last Name"
        name="id"
      />
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="text"
        placeholder="Email"
        name="id"
      />
      <input
        onChange={() => setIsTyping(true)}
        className="w-[70%] rounded-md p-3 outline-C_DarkBlue md:w-[80%] md:text-2xl lg:p-2 lg:text-lg"
        type="password"
        placeholder="Password"
        name="id"
      />

      <input
        onChange={() => setIsTyping(true)}
        id="file"
        type="file"
        className="hidden"
      />
      <label
        className="flex cursor-pointer flex-row items-center"
        htmlFor="file"
      >
        <FontAwesomeIcon
          icon={faImage}
          className="p-1 text-[150%] text-C_DarkBlue"
        />
        <span className="text-[80%] text-C_TextBlack">Add profile pic</span>
      </label>

      <button className="rounded-xl bg-C_DarkBlue px-3 py-2 text-2xl text-C_TextWhite shadow-lg md:mt-3 md:text-3xl lg:mt-3 lg:text-xl">
        Register
      </button>
      <div className="text-sm">
        You have an account?
        <Link className="ml-1  text-sm font-bold text-C_DarkBlue" to={'/login'}>
          Log in
        </Link>
      </div>
      {!isTyping && error.length > 0 && (
        <span className="text-sm text-red-600 ">Something went wrong</span>
      )}
    </form>
  );
};

export default Register;
