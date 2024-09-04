// src/components/ChatList.js
import React from 'react';

const chats = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const ChatList = ({ onSelectChat }) => {
  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            <button  id="send-button" onClick={() => onSelectChat(chat.id)}>
              {chat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
