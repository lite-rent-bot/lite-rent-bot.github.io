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
import ChatList from './components/ChatList';
import ChatMessages from './components/ChatMessages';


function App() {
    const {onToggleButton, tg} = useTelegram();
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };
  
    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div>
      {selectedChatId === null ? (
        <ChatList onSelectChat={handleSelectChat} />
      ) : (
        <ChatMessages chatId={selectedChatId} onBack={handleBack} />
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
