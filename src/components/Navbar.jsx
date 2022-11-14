import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='Navbar'>
      <span style={{color:'white',fontSize:'20px',fontWeight:'bolder'}} className='logo'> Daily Chat</span>
      <div className='user'>
        <img style={{backgroundColor:'white',height:'24px',width:'24px',borderRadius:'50%',objectFit:'cover'}} src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} style={{cursor:'pointer'}}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
