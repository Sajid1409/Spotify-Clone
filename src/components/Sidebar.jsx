import React from 'react'
import logo from '../logo.png';
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled, MdSearch} from 'react-icons/md'
import Playlist from './Playlist';
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top__links">
        <div className="logo">
        <img
          src={logo}
          alt="spotify-logo"
        />
        </div>
        <ul>
          <li>
            <MdHomeFilled/>
            <span>Home</span>
          </li>
          <li>
            <MdSearch/>
            <span>Search</span>
          </li>
          <li>
            <IoLibrary/>
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </div>
  )
}

export default Sidebar