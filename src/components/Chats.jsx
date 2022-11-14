import React , { useContext, useEffect, useState } from 'react'
import  '../pages/Register.css'
import MyImage from './divy.png'
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext.js";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
// 
const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  
  console.log(Object.entries(chats));
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
   
  return (
    // sort((a,b)=>b[1].date - a[1].date).
      <div className='chats'>
      {Object.entries(chats)?.map((chat) => (
      <div 
      className='userchat'
      key={chat[0]}
      onClick={() => handleSelect(chat[1].userInfo)
      } >
        {/* > */}
      
        
        <img src=
        // ""
        {chat[1].userInfo.photoURL} 

        style={{height:'50px', 
        width:'50px',
        borderRadius:'50%',
        objectFit:'cover' }}
         alt="img" />
        <div className='userchatinfo'>
          <span>
          {/* divy */}
          {chat[1].userInfo.displayName}
          
          </span>
          <p>
          {/* hello */}
          {chat[1].lastMessage?.text}
          
          </p>
        </div>
      </div>
      ))}
    </div>
  );
      };


export default Chats
