import { FC, useContext, useEffect, useRef } from "react";
import { LoginContext } from "../context/AuthContext";
import { UserInfo } from "firebase/auth";
import { MessageData } from "./MessageSection";

interface MessageParams {
  user: UserInfo;
  message: MessageData;
  displayMetaData: boolean;
}
export const Message: FC<MessageParams> = ({
  user,
  message,
  displayMetaData,
}) => {
  const { currentUser } = useContext(LoginContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={`sms ${
        currentUser.uid === message.senderId ? "owner-sms" : ""
      } ${displayMetaData ? " pt-5" : "pt-[2px]"}`}
    >
      {displayMetaData && (
        <span className="sms-user-name ">
          {currentUser.uid === message.senderId
            ? currentUser.displayName
            : user.displayName}
        </span>
      )}

      <div className="sms-info">
        {displayMetaData ? (
          <img
            src={
              currentUser.uid === message.senderId
                ? currentUser.photoURL || ""
                : user.photoURL || ""
            }
            alt="profile"
            className="h-8 w-8 rounded-full border-2 border-C_Gold "
          />
        ) : (
          <div className="h-8 w-8 rounded-full border-2 border-transparent "></div>
        )}
        <div className="sms-content">
          {message.text && (
            <div
              className={`sms-content-text ${
                displayMetaData
                  ? `${
                      currentUser.uid === message.senderId
                        ? "rounded-bl-xl rounded-br-xl rounded-tl-xl rounded-tr-none"
                        : "rounded-bl-xl rounded-br-xl rounded-tl-none rounded-tr-xl"
                    }   `
                  : "rounded-xl"
              }`}
            >
              {message.text}
              <span>{message.date.toDate().toLocaleDateString("en-US")}</span>
            </div>
          )}
          {message.imageURL && (
            <img src={message.imageURL} alt="pic" className="block " />
          )}
        </div>
      </div>
    </div>
  );
};
