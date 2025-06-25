import React, { useState } from "react";
import UserList from "../components/UserList";
import Chat from "../pages/Chat";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ChatApp() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kylie",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      lastSeen: "10 minutes ago",
      messages: [
        { fromMe: false, text: "Hi!" },
        { fromMe: true, text: "Hello Shreya!" },
      ],
    },
    {
      id: 2,
      name: "Shreya",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      lastSeen: "1 hour ago",
      messages: [
        { fromMe: false, text: "Hey!" },
        { fromMe: true, text: "Hi Shreya, how are you?" },
      ],
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
                  ? { fromMe: true, text: messageOrObj }
                  : { fromMe: true, ...messageOrObj },
              ],
            }
          : u
      )
    );
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Sidebar OUTSIDE card, hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Main card container: only this has border/radius/shadow */}
      <div
        className="w-full max-w-md h-[96vh] flex flex-col rounded-[32px] bg-white shadow-2xl overflow-hidden border border-black"
        style={{ minHeight: "640px", maxHeight: "96vh" }}
      >
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
    </div>
  );
}
