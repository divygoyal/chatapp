import React from 'react'
import "./Register.css"
import add from "./image-.png"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from "../firebase";
// import { async } from '@firebase/util';
import { useState } from 'react';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";




const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
  
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className='formcontainer'>
        <div className='formwrapper'>
        <span className='logo'>DailyChat</span>
         <span style={{color:'#724fd3',height:'20px'}} className='title'> Register</span>
            <form onSubmit={handleSubmit} className='form'>
                <input className='input' type="name" placeholder='name'/>
                <input className='input' type="email" placeholder='Email'/>
                <input className='input' type="password" placeholder='Password'/>
                <input style={{display:"none"}} className='input' id ='file'type="file"/>
                <label classname='label'style={{display:'flex',alignContent:'center',gap:'10px'}} htmlFor='file'><img classname ="img" src ={add} alt="loading"/><span style= {{color:'black',fontWeight:'bold' }}>Choose your avatar</span> </label>
                
                <button disabled={loading} className='button'>Sign up</button>
                {loading && "Uploading and compressing the image please wait..."}
                {err && <span>something went wrong </span>}
                
            </form>
            <p style={{fontWeight:'bold'}} >Already have an account ? <Link to ="/login">Login</Link></p>
        </div>
    
    </div>
  )
}

export default Register
