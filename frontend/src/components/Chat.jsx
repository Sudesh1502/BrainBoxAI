import React, { useContext } from "react";
import MyContext from "../MyContext";
import rehypeHighlight from 'rehype-highlight'
import ReactMarkdown from 'react-markdown'
import 'highlight.js/styles/github-dark.css'
import "./Chat.css";

const Chat = () => {
  const { prevChat, setPrevChat, newChat, setNewChat } = useContext(MyContext);
  return (
    <>
      {newChat ? <h1>Start a New Chat!</h1> : <></>}
      <div className="chats">
        {prevChat?.map((chat, idx) => {
          return (
            <div
              key={idx}
              className={chat.role == "user" ? "userDiv" : "gptDiv"}
            >
              {chat.role == "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (

                // package for highlight(rehypeHighlight) the from ai and format(ReactMarkdown) the reply  
                <ReactMarkdown  rehypePlugins={rehypeHighlight}>{chat.content}</ReactMarkdown>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Chat;
