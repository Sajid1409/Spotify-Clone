import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from "axios";
import { reducerCases } from '../utils/Constants';

const Playlist = () => {
  const [{token, playlists}, dispatch] = useStateProvider();
  useEffect(()=>{
    const getPlaylistData = async ()=>{
      const res = await axios.get("https://api.spotify.com/v1/me/playlists",
      {
       headers:{
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      }
    });
    const { items }= res.data;
   
    const playlists=items.map(({name,id, owner})=>{
      return {name, id, owner};
    })

    dispatch({type:reducerCases.SET_PLAYLISTS, playlists})
    }
    getPlaylistData();
    
  },[token,dispatch]);
  const changePlaylist=(selectedPlaylistId)=>{
    dispatch({type:reducerCases.SET_PLAYLIST_ID, selectedPlaylistId})
  }
return <div className='playlist'>
      <ul>
      {
        playlists.map(({ name, id }) => {
        return (
          <li key={id} onClick={()=>changePlaylist(id)}>
          {name}
          </li>
        );
      })
      }
    </ul>
  </div>
  
}
export default Playlist