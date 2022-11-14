import React from 'react'
// import { ImgHTMLAttributes } from 'react'
import MyImage from './divy.png';
import '../pages/Register.css';
import { useState } from 'react';
import { db } from '../firebase';
import {getDoc,doc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { collection, query, where } from "firebase/firestore";
import { async } from '@firebase/util';
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  
  return (
    <div className='search' style={{ border:'1px solid grey'}}>
      <div className='searchform' style={{padding:'10px'}}>
        <input style={{backgroundColor:'transparent',border:'none',outline:'none' ,color:'white'}} 
        type="text"
        placeholder='Find a user' 
        onKeyDown={handleKey} 
        onChange={e=>setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>error</span>}
      {user && <div className='userchat' onClick={handleSelect} >
        {/* <img src="pexels-maksim-goncharenok-5611966.jpg" alt="hello" /> */}
        {/* <img src="pexels-maksim-goncharenok-5611966.jpg" alt="hello" /> */}
        <img src={user.PhotoURL} style={{height:'50px', width:'50px',borderRadius:'50%',objectFit:'cover' }} alt="horse" />
        <div className='userchatinfo'>
          <span>{user.displayName}</span>
        </div>
      </div>} 
    </div> 
  )
}

export default Search
