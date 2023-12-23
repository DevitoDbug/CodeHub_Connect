import {
  faMicrophoneAlt,
  faPaperPlane,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { LoginContext } from '../context/AuthContext';
import { updateLastMessageAndDate } from '../firebase/userChats';

const InputArea = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(LoginContext);

  const [text, setText] = useState('');
  const [img, setImage] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.log('There  was a failure on the upload\n ERROR: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, 'chats', data.combinedId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  imageURL: downloadURL,
                  senderId: currentUser?.providerData[0]?.uid,
                  date: Timestamp.now(),
                }),
              });
            } catch (e) {
              console.log(e);
            }
          });
        },
      );
    } else {
      await updateDoc(doc(db, 'chats', data.combinedId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.providerData[0]?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    //Update the last message and date in the userChats collection for both users
    //updateDoc(doc(db, 'userChats', uid)-  for user 1

    //updateLastMessageAndDate(userID, combinedID, lastMessage) - for user 1
    await updateLastMessageAndDate(currentUser.uid, data.combinedId, text);

    //updateLastMessageAndDate(userID, combinedID, lastMessage) - for user 2
    // Fields in the data.userInfo object are : .id , .name, .login, .email, .avatar_url
    await updateLastMessageAndDate(data.userInfo.id, data.combinedId, text);
    setText('');
    setImage(null);
  };

  return (
    <div className="md:w-[67vw]">
      <div className="flex h-auto w-[95%] resize-y flex-row items-center justify-around gap-2 rounded-lg border-2 border-C_GreyBorder bg-C_WhiteBright p-1">
        <div className="flex items-center justify-center gap-1 ">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
          />
          <label htmlFor="image">
            <FontAwesomeIcon
              icon={faPaperclip}
              className={`ml-2 text-xl  ${
                img ? 'text-C_DarkBlue' : 'text-C_UserDullBlack'
              }`}
            />
          </label>
          <FontAwesomeIcon
            icon={faMicrophoneAlt}
            className="ml-2 text-xl text-C_UserDullBlack"
          />
        </div>
        <textarea
          id="expanding-textarea"
          style={{ height: '3rem' }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          rows="2"
          className="h-auto w-[70%] resize-none justify-end outline-none"
          placeholder="Type new message..."
          type="text"
          value={text}
        />
        <button onClick={handleSend}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className=" relative right-2 justify-end text-xl text-C_UserDullBlack"
          />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
