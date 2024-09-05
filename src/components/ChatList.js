// src/components/ChatList.js
import React from 'react';

const chats = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const ChatList = ({ onSelectChat }) => {
  return (
    <div class="chat-list">
		<div class="chat-list-header">
			<h1>Список чатов</h1>
		</div>
		<div  class="chat-item">
			{chats.map(chat => (
				<div class="avatar">A</div>
				<div class="chat-name">
					<li key={chat.id}>
						<button  onClick={() => onSelectChat(chat.id)}>
						  {chat.name}
						</button>
					</li>
					<div class="chat-preview">Hey, are we still on for tonight?</div>
				</div>
			))}
		</div>
	</div>
  );
};

export default ChatList;
