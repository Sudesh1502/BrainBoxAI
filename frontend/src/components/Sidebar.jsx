import React from "react";
import "./Sidebar.css";
import logo from "../assets/brainBox AI.png";
const Sidebar = () => {
  return (
    <section className="sidebar">
      {/* create new btn */}
      <button type="submit" className="newChatBtn">
        <img src={logo} alt="logo" className="logoBtn" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      {/* history list  */}
      <ul className="history">
        <li>history 1</li>
        <li>history 2</li>
        <li>history 3</li>
      </ul>
      <div className="sign">
        <p>By Sudesh Mhamankar</p>
      </div>
    </section>
  );
};

export default Sidebar;
