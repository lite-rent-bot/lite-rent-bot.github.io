// src/components/ChatList.js
import React from 'react';

const chats = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const ChatList = ({ onSelectChat }) => {
  return (
    <div class="container">
	<div class="sidebar">
		<div class="sidebar-header">
		  <h1>Chat List</h1>
		  </div>
			  <ul  class="contacts">
				{chats.map(chat => (
				  <li key={chat.id}>
					<button  onClick={() => onSelectChat(chat.id)}>
					  {chat.name}
					</button>
				  </li>
				))}
			  </ul>
		   </div>
	   </div>
	</div>
	</div>
  );
};

export default ChatList;
