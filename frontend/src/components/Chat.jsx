import React, { useContext } from 'react'
import MyContext from '../MyContext';
import './Chat.css'

const Chat = () => {
  const {prevChat, setPrevChat, newChat, setNewChat } =useContext(MyContext);
  return (
    <>
    {newChat? <h1>Start a New Chat!</h1>:<></>}
      <div className="chats">
        <div className="userDiv">
          <p className='userMessage'>User chat</p>
        </div>
        <div className="gptDiv">
          <p className='gptMessage'>GPT chat</p>
        </div>
      </div>
    </>
  )
}

export default Chat