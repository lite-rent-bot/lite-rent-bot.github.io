import './App.css';
import React, {useState}, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Form2 from "./components/Form/Form2";
import ChatList from './components/ChatList';
import MessageList from './components/MessageList';

function App() {
    const {onToggleButton, tg} = useTelegram();
	const [selectedChat, setSelectedChat] = useState(null);

	const chats = [
		{ id: 1, name: 'Chat A' },
		{ id: 2, name: 'Chat B' },
		{ id: 3, name: 'Chat C' },
	  ];

	const messages = {
		1: ['Hello from A!', 'How are you?'],
		2: ['Hello from B!', 'What’s up?'],
		3: ['Hello from C!', 'Good to see you!'],
	  };

	const handleSelectChat = (chat) => {
		setSelectedChat(chat);
	  };

    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div>
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      {selectedChat && (
        <MessageList messages={messages[selectedChat.id]} />
      )}
    </div>
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
