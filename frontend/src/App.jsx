
import { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow.jsx'
import Sidebar from './components/Sidebar.jsx'
import MyContext from './MyContext.jsx'
import {v1 as uuidv1} from 'uuid'
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [threadId, setThreadId] = useState(uuidv1());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat]  = useState(true);
  const [allThreads, setAllThreads] = useState(null);
  const contextvalues = {prompt, setPrompt, reply, setReply, threadId, setThreadId, prevChat, setPrevChat, newChat, setNewChat, allThreads, setAllThreads};
  return (
    <>
    <MyContext.Provider value={contextvalues} >
      <div className="app">
        <Sidebar/>
        <ChatWindow/>
      </div>
    </MyContext.Provider>
     
    </>
  )
}

export default App
