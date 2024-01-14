import {
  faMicrophoneAlt,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { LoginContext } from "../context/AuthContext";
import {
  updateLastMessageAndDate,
  updateUserChats,
} from "../firebase/userChats";
import { uploadImageAndText, uploadText } from "../firebase/chat";

const InputArea = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(LoginContext);

  const [text, setText] = useState<string>("");
  const [img, setImage] = useState<File>();

  const handleSend = async () => {
    if (!data) {
      throw Error("data from ChatContextParams missing");
    }
    if (!currentUser.uid) {
      throw Error("no currentUser uid");
    }

    if (img) {
      await uploadImageAndText({
        img,
        combinedId: data.combinedId,
        currentUserId: currentUser.uid,
        text,
      });
    } else {
      await uploadText({
        combinedId: data.combinedId,
        currentUserId: currentUser.uid,
        text,
      });
    }

    //user1
    await updateUserChats({
      userID: currentUser.uid,
      combinedID: data.combinedId,
      otherUserID: data.userInfo.uid,
      otherUserDisplayName: data.userInfo.displayName || "",
      otherUserEmail: data.userInfo.email || "",
      otherUserPhotoURL: data.userInfo.photoURL || "",
    });
    //user2
    await updateUserChats({
      userID: data.userInfo.uid,
      combinedID: data.combinedId,
      otherUserID: currentUser.uid,
      otherUserDisplayName: currentUser.displayName || "",
      otherUserEmail: currentUser.email || "",
      otherUserPhotoURL: currentUser.photoURL || "",
    });

    //user1
    await updateLastMessageAndDate({
      userID: currentUser.uid,
      combinedID: data.combinedId,
      lastMessage: text,
    });
    // user2
    await updateLastMessageAndDate({
      userID: data.userInfo.uid,
      combinedID: data.combinedId,
      lastMessage: text,
    });

    setText("");
    setImage(undefined);
  };

  return (
    <div className=" md:w-[67vw]">
      <div className="flex h-auto w-full resize-y flex-row items-center justify-around gap-2 rounded-lg border-2 border-C_GreyBorder bg-C_WhiteBright p-1 md:w-[95%]">
        <div className="flex items-center justify-center gap-1 ">
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
              }
            }}
            type="file"
            id="image"
            className="hidden"
          />
          <label htmlFor="image">
            <FontAwesomeIcon
              icon={faPaperclip}
              className={`ml-2 text-xl  ${
                img ? "text-C_DarkBlue" : "text-C_UserDullBlack"
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
          style={{ height: "3rem" }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="h-auto w-[70%] resize-none justify-end outline-none"
          placeholder="Type new message..."
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
