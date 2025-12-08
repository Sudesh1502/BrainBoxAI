import { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MyContext from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Application() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [threadId, setThreadId] = useState(uuidv1());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState(null);

  // 👇 NEW state for sidebar toggle
  const [showSidebar, setShowSidebar] = useState(false);

  const contextvalues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    threadId,
    setThreadId,
    prevChat,
    setPrevChat,
    newChat,
    setNewChat,
    allThreads,
    setAllThreads,
  };

  return (
    <>
      <MyContext.Provider value={contextvalues}>
        <div className="app">
          {/* sidebar wrapper for slide effect */}
          <div
            className={
              showSidebar ? "sidebarContainer open" : "sidebarContainer"
            }
          >
            <Sidebar setShowSidebar={setShowSidebar} />
          </div>
         
          {/* overlay click to close */}
          {showSidebar && (
            <div
              className="overlay"
              onClick={() => setShowSidebar(false)}
            ></div>
          )}

          <ChatWindow showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
        </div>
      </MyContext.Provider>
    </>
  );
}

export default Application;
