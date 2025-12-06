import React, { useContext, useState } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import MyContext from "../MyContext";
import {PacmanLoader} from 'react-spinners'

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, threadId, setThreadId } =
    useContext(MyContext);
    const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId,
      }),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/chat`, options);
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="chatwindow">
      <div className="navbar">
        <span>
          BrainBox AI<i class="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv">
          <span className="userIcon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat>
        
                
      </Chat>
<PacmanLoader color="orange" loading={loading}/>
      <div className="chatInput">
        <div className="userinput">
          <input
            type="text"
            placeholder="Ask me anything"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                getReply();
              }
            }}
          />
          <div
            id="submit"
            onClick={(e) => {
              getReply();
            }}
            
          >
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          BrainBox AI can make mistake. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
