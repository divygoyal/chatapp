import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Register.css"

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='formcontainer'>
        <div className='formwrapper'>
        <span className='logo'>DailyChat</span>
         <span style={{color:'#724fd3',height:'20px'}} className='title'> Login</span>
            <form onSubmit={handleSubmit} className='form'>
                {/* <input className='input' type="name" placeholder='name'/> */}
                <input className='input' type="email" placeholder='Email'/>
                <input className='input' type="password" placeholder='Password'/>
                {/* <input style={{display:"none"}} className='input' id ='file'type="file"/> */}
                {/* <label classname='label'style={{display:'flex',alignContent:'center',gap:'10px'}} htmlFor='file'><img classname ="img" src ={add} alt="loading"/><span style= {{color:'black',fontWeight:'bold' }}>Choose your avatar</span> </label> */}
                 
                <button className='button'>Login</button>
                {err && <span>something went wrong </span>}
            </form>
            <p style={{fontWeight:'bold'}} >Don't have an account?  <Link to ="/register">Register</Link></p>
        </div>
    
    </div>
  )
}

export default Login;
