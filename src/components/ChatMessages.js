// src/components/ChatMessages.js
import React from 'react';

const messages = {
  1: ['Hi, how are you?', 'I am fine, thanks!'],
  2: ['What are you doing?', 'Just chilling.'],
  3: ['Let\'s catch up!', 'Sure, when?']
};

const ChatMessages = ({ chatId, onBack }) => {
  return (
    <div>
      <h1>Messages</h1>
      <button onClick={onBack}>Back to Chats</button>
      <ul>
        {messages[chatId]?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;

