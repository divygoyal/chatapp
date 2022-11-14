import React from 'react'
import Chat from './Chat'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
