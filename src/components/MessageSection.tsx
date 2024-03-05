import { FC, useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import { InputArea } from "./InputArea";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavContext } from "../pages/Home";

export interface MessageData {
  date: Timestamp;
  id: string;
  senderId: string;
  text: string;
  imageURL: string;
}

export const MessageSection: FC = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { scrollToContactSection } = useContext(NavContext);
  let lastSender = "";

  //TODO clean clean code here
  useEffect(() => {
    const unSub =
      data.combinedId.length > 0
        ? onSnapshot(doc(db, "chats", data.combinedId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
          })
        : () => {};
    return () => {
      unSub();
      setMessages([]);
    };
  }, [data.combinedId]);

  return (
    <div className="relative flex h-full flex-col  px-2">
      <button
        className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-C_DarkBlue text-lg text-C_TextWhiteDull md:hidden "
        onClick={scrollToContactSection}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="h-full overflow-y-scroll ">
        {messages &&
          messages.map((message) => {
            const isSameSender = message.senderId === lastSender;

            // Only update lastSender if the sender is different
            if (!isSameSender) {
              lastSender = message.senderId;
            }

            return (
              <Message
                key={message.id}
                message={message}
                user={data.userInfo}
                displayMetaData={!isSameSender}
              />
            );
          })}
      </div>
      <div className=" bottom-0 h-[10%] w-full">
        <InputArea />
      </div>
    </div>
  );
};
