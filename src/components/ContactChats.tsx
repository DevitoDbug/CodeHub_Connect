import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { OptionsNavBar } from "./OptionsNavBar";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LoginContext } from "../context/AuthContext";
import { Contact_ForContactChats } from "./Contact_ForContactChats";

export const ContactChats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const { currentUser } = useContext(LoginContext);

  const [isActive, setIsActive] = useState("");

  const handleContactClick = (id: string) => {
    setIsActive(id);
  };

  //fetches chats everytime user changes
  useEffect(() => {
    const getChats = () => {
      if (currentUser.uid) {
        const ref = doc(db, "userChats", currentUser.uid);
        const unsub = onSnapshot(ref, (doc) => {
          setChats(doc.data());
        });
        return () => {
          unsub();
        };
      } else return;
    };

    getChats();
  }, [currentUser.uid]);

  return (
    <aside className=" h-full w-full">
      <div className=" h-[12%] md:mt-2 md:h-[9%] lg:h-[15%]">
        <NavBar />
      </div>
      <div className="m-1 flex h-[86%] flex-col justify-between rounded-xl bg-C_LightBlue p-4 md:h-[89%] lg:h-[81%]">
        <div className="flex flex-col gap-3">
          {chats &&
            Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((user) => {
                return (
                  <Contact_ForContactChats
                    key={user[0]}
                    userInfo={user[1].userInfo}
                    lastMessage={user[1].lastMessage?.text || ""}
                    lastMessageDate={user[1].date}
                    isSelected={isActive === user[0]}
                    onClick={() => handleContactClick(user[0])}
                  />
                );
              })}
        </div>
        <div>
          <OptionsNavBar />
        </div>
      </div>
    </aside>
  );
};
