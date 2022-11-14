import React , { useContext, useEffect, useRef }from 'react'
import "../pages/Register.css"
import image from './divy.png'
import girl from './girl.jpg'
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/ChatContext";
const Message = ({message}) => {
  

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    
    <div 
    ref={ref}
     className=
     {`Message ${message.senderId === currentUser.uid && "owner"}`}
    //  "Message owner"
     >
      <div className="messageinfo">
        <img src=
        { message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL} 
              // {image}
              alt="" />
<span>just now </span>
      </div>
      
      <div className="messagecontent">
      <p>
      {message.text}
      {/* hello */}
      </p>
      {/* <img src={girl} alt="" /> */}
      {message.img && <img src={message.img} alt="" />}
      </div>

    </div>
  )
}

export default Message
