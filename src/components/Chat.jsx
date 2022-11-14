import React , { useContext } from 'react'
import  '../pages/Register.css'

import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className='Chat'>
    
      <div className='chatinfo' >
        <span>
        {/* hello */}
        {data.user?.displayName}
        </span>
        <div className='chaticons' style={{display:'flex',gap:'10px'}}>
        <img src="https://img.icons8.com/sf-regular-filled/48/null/multiple-cameras.png" alt= "" />
        <img src="https://img.icons8.com/sf-regular-filled/48/null/multiple-cameras.png" alt= "" />
        <img src="https://img.icons8.com/sf-regular-filled/48/null/multiple-cameras.png" alt= "" />
        
        </div>

        
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat

