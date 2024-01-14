import { FC, useContext, useEffect, useState } from "react";
import Message from "./Message";
import InputArea from "./InputArea";
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

const MessageSection: FC = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { scrollToContactSection } = useContext(NavContext);
  let lastSender = "";

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
      setMessages([]);
    };
  }, [data.combinedId]);

  return (
    <div className="relative h-full w-full p-2 md:w-full">
      <button
        className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-C_DarkBlue text-lg text-C_TextWhiteDull md:hidden "
        onClick={scrollToContactSection}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="h-[90%] overflow-y-scroll sm:h-[85vh] md:h-[93vh] lg:h-[90vh]">
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
      <div className="sticky bottom-0 m-0 h-[10%] w-full p-0 sm:h-[15vh] md:h-[7vh] md:w-[full%] lg:h-[10vh]">
        <InputArea />
      </div>
    </div>
  );
};

export default MessageSection;
