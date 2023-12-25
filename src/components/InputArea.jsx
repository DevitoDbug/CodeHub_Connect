import {
  faMicrophoneAlt,
  faPaperPlane,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { LoginContext } from '../context/AuthContext';
import {
  updateLastMessageAndDate,
  updateUserChats,
} from '../firebase/userChats';
import { uploadImageAndText, uploadText } from '../firebase/chat';

const InputArea = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(LoginContext);
  const { currentUserBulk } = useContext(LoginContext);

  const [text, setText] = useState('');
  const [img, setImage] = useState(null);

  const handleSend = async () => {
    if (img) {
      //update the chat collection with the image and text
      //uploadImageAndText(img,combinedId,currentUserId,text)
      await uploadImageAndText(img, data.combinedId, currentUser.uid, text);
    } else {
      //update the chat collection with the text
      //uploadText(combinedId,currentUserId,text)
      await uploadText(data.combinedId, currentUser.uid, text);
    }

    //update the userInfo object in the userChats collection with the details of the user who sent the message
    //updateUserChats(  userID,combinedID,otherUserID,otherUserDisplayName,otherUserNickName,otherUserEmail,otherUserPhotoURL,)
    await updateUserChats(
      currentUser.uid,
      data.combinedId,
      data.userInfo.id,
      data.userInfo.name,
      data.userInfo.login,
      data.userInfo.email,
      data.userInfo.avatar_url,
    );

    await updateUserChats(
      data.userInfo.id,
      data.combinedId,
      currentUser.uid,
      currentUser.displayName,
      currentUserBulk.reloadUserInfo.screenName,
      currentUser.email,
      currentUser.photoURL,
    );

    //Update the last message and date in the userChats collection for both users
    //updateLastMessageAndDate(userID, combinedID, lastMessage) - for user 1
    await updateLastMessageAndDate(currentUser.uid, data.combinedId, text);

    //updateLastMessageAndDate(userID, combinedID, lastMessage) - for user 2
    await updateLastMessageAndDate(data.userInfo.id, data.combinedId, text);
    setText('');
    setImage(null);
  };

  return (
    <div className=" md:w-[67vw]">
      <div className="flex h-auto w-full resize-y flex-row items-center justify-around gap-2 rounded-lg border-2 border-C_GreyBorder bg-C_WhiteBright p-1 md:w-[95%]">
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
