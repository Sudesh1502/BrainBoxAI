import React, { useContext, useEffect, useState } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import MyContext from "../MyContext";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ChatWindow = ({showSidebar, setShowSidebar}) => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    threadId,
    setThreadId,
    prevChat,
    setPrevChat,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Logged out!");
        navigate("/auth");
      } else {
        toast.error("Logout failed!");
      }
    } catch (err) {
      toast.error(err.message || "Network error!");
    }
  };

  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      credentials: "include",
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
      setReply(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChat((prevChat) => {
        return [
          ...prevChat,
          {
            role: "user",
            content: prompt,
          },
          reply,
        ];
      });
      setPrompt("");
      setNewChat(false);
    }
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatwindow">
      <div className="navbar">

        <span>
           {/* mobile hamburger */}
          {!showSidebar && <div className="mobileMenuIcon" onClick={() => setShowSidebar(!showSidebar)}>
            <i className="fa-solid fa-bars"></i>
          </div>}
          BrainBox AI<i className="fa-solid fa-angle-down"></i>
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i class="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                logout();
              }}
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
            </span>
          </div>
        </div>
      )}

      <Chat></Chat>
      <div className="loaderContainer">
        <PropagateLoader color="white" loading={loading} />
      </div>
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
            <i className="fa-solid fa-paper-plane"></i>
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
