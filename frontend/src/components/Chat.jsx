import React, { useContext, useEffect, useState } from "react";
import MyContext from "../MyContext";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import './Chat.css'
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const { prevChat, setPrevChat, reply, newChat, setNewChat } =
    useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestReply(null);
      return;
    }
    if (!prevChat?.length) return;

    const content = reply.content.split(" ") ?? [];

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) return clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [prevChat, reply]);

  return (
    <>
      {newChat ? <h1>Start a New Chat!</h1> : <></>}
      <div className="chats">
        {prevChat?.slice(0, -1).map((chat, idx) => {
          return (
            <div
              key={idx}
              className={chat.role == "user" ? "userDiv" : "gptDiv"}
            >
              {chat.role == "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                // package for highlight(rehypeHighlight) the from ai and format(ReactMarkdown) the reply
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}

        {prevChat?.length > 0 && (
          <>
            {latestReply !== null ? (
              <div className="gptDiv" key={"typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="gptDiv" key={"non-typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {prevChat[prevChat.length - 1].content}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
