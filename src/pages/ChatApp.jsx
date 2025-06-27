import React, { useState } from "react";
import UserList from "../components/UserList";
import Chat from "../pages/Chat";

import userlist1 from "../assets/userlist1.png";
import userlist2 from "../assets/userlist2.jpg";
import userlist3 from "../assets/unerlist3.webp";

export default function ChatApp() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kylie",
      photo: userlist1,
      activity: true,
      lastSeen: "23 min",
      unread: 1,
      typing: false,
      lastMessage: { text: "Sticker 😍", fromMe: false, time: "23 min" },
      messages: [{ fromMe: false, text: "Sticker 😍", time: "2:55 PM" }],
    },
    {
      id: 2,
      name: "Kim",
      photo: userlist2,
      activity: true,
      lastSeen: "27 min",
      unread: 2,
      typing: true,
      lastMessage: { text: "Typing..", fromMe: false, time: "27 min" },
      messages: [{ fromMe: false, text: "Typing...", time: "2:57 PM" }],
    },
    {
      id: 3,
      name: "Kendal",
      photo: userlist3,
      lastSeen: "33 min",
      unread: 0,
      typing: false,
      lastMessage: { text: "Ok, see you then.", fromMe: false, time: "33 min" },
      messages: [{ fromMe: false, text: "Ok, see you then.", time: "2:50 PM" }],
    },
  ]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSendMessage = (userId, messageOrObj) => {
    setUsers((users) =>
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              messages: [
                ...u.messages,
                typeof messageOrObj === "string"
                  ? { fromMe: true, text: messageOrObj, time: "3:12 PM" }
                  : { fromMe: true, ...messageOrObj, time: "3:12 PM" },
              ],
              unread: 0,
              typing: false,
            }
          : u
      )
    );
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-white">
      {!selectedUserId ? (
        <UserList
          users={users}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />
      ) : (
        <Chat
          user={selectedUser}
          onSendMessage={handleSendMessage}
          onBack={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}
