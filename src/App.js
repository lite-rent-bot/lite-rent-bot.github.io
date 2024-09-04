import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
//import {Route, Routes} from 'react-router-dom'
//import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
//import Form2 from "./components/Form/Form2";
//import ChatList from './components/ChatList';
//import MessageList from './components/MessageList';

const chats = [
  { id: 1, name: "Chat 1", messages: ["Hello from Chat 1", "How are you?"] },
  { id: 2, name: "Chat 2", messages: ["Welcome to Chat 2", "What's up?"] },
  { id: 3, name: "Chat 3", messages: ["Chat 3 is here!", "Let's talk!"] },
];

const ChatList = () => {
  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            <Link to={`/chat/${chat.id}`}>{chat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatMessages = ({ chat }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>{chat.name}</h1>
      <button onClick={() => navigate('/')}>Back to Chat List</button>
      <ul>
        {chat.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

const Chat = ({ id }) => {
  const chat = chats.find(chat => chat.id === parseInt(id));
  return chat ? <ChatMessages chat={chat} /> : <div>Chat not found</div>;
};

function App() {
    const {onToggleButton, tg} = useTelegram();
    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatMessagesWrapper />} />
      </Routes>
    </Router>
  );
 //   return (
 //       <div className="App">
 //           <Header />
//            <Routes>
//                <Route index element={<ProductList />}/>
//                <Route path={'form'} element={<Form />}/>
//				<Route path={'form2'} element={<Form2 />}/>
//            </Routes>
//        </div>
//    );
}

export default App;
