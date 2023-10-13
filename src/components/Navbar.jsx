import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'
const Navbar = ({navBackground}) => {
  const [{userInfo}]=useStateProvider();
  return (
    <div className={"nav" + (navBackground ? " dark":"")} >
      <div className="search__bar">
        <FaSearch className='icon'/>
        <input type='text' placeholder='Artists, songs or podcasts'/>
      </div>
      <div className="avatar">
        
        <a href='#'>
        <CgProfile/> 
        <span>{userInfo?.name}</span> 
        </a>
      </div>
    </div>
  )
}

export default Navbar