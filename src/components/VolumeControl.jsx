import React from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import {FiVolume1} from 'react-icons/fi';
import {HiOutlineQueueList} from 'react-icons/hi2';
const VolumeControl = () => {
  const [{token}, dispatch] = useStateProvider();
  const setVolume= async (e)=>{
    await axios.put("https://api.spotify.com/v1/me/player/volume",{},
    {
      params:{
        volume_percent:parseInt(e.target.value),
      },
    
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
  }
  return (
    <div className='volume-control-container'>
      <HiOutlineQueueList className='icon'/>
      <FiVolume1 className='icon'/>
      <input id="volume" type='range' min={0} max={100} onMouseUp={(e)=>setVolume(e)}/>
    </div>
  )
}

export default VolumeControl;