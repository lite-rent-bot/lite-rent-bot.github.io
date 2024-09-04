// src/ChatList.js
import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
