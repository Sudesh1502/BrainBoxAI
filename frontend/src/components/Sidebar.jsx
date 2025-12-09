import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import logo from "../assets/brainBox AI.png";
import MyContext from "../MyContext";
import { v1 as uuidv1 } from "uuid";
import { useLoader } from "./LoaderContext";
const Sidebar = ({ setShowSidebar }) => {
  const {
    setPrompt,
    setReply,
    threadId,
    setThreadId,
    allThreads,
    setAllThreads,
    prevChat,
    setPrevChat,
    setNewChat,
  } = useContext(MyContext);
const {setLoading} = useLoader();
  const getAllThreads = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_RENDER_URL}/api/threads`, {
        method: "GET",
        credentials: "include",
      });
      const res = await response.json();
      const data = res?.map((thread) => {
        return { threadId: thread.thread_id, title: thread.title };
      });

      console.log(data);
      setAllThreads(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllThreads();
  }, [threadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setPrevChat([]);
    setThreadId(uuidv1());
  };

  const getChat = async (newThreadId) => {
    setLoading(true);
    setThreadId(newThreadId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_RENDER_URL}/api/thread/${newThreadId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const res = await response.json();
      setNewChat(false);
      setReply(null);
      setPrevChat(res.messages);
      setLoading(false)
      console.log(res.messages);
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  const deleteThread = async (newThreadId) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RENDER_URL}/api/thread/${newThreadId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const res = await response.json();
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== newThreadId)
      );
      if (newThreadId == threadId) {
        createNewChat();
      }
      console.log(res);
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };
  return (
    <section className="sidebar">
      {/* create new btn */}
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          createNewChat();
        }}
        className="newChatBtn"
      >
        <img src={logo} alt="logo" className="logoBtn" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      {/* history list  */}
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <div className="history-item" key={idx}>
            <li
              onClick={(e) => {
                e.preventDefault();
                setShowSidebar(false);
                getChat(thread.threadId);
                
              }}
            >
              {thread.title.length > 20 ? thread.title.slice(0, 20) + "..." : thread.title}
            </li>
            <span className="del">
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </span>
          </div>
        ))}
      </ul>
      <div className="sign">
        <p>By Sudesh Mhamankar</p>
      </div>
    </section>
  );
};

export default Sidebar;
