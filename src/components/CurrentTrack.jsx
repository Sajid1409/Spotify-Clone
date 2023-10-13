import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/Constants';


const CurrentTrack = () => {
  const [{token, currentlyPlaying}, dispatch]  = useStateProvider();
  useEffect(()=>{
    const getCurrentTrack = async ()=>{
      const res = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      if (res.data !== "") {
        const currentlyPlaying = {
          id: res.data.item.id,
          name: res.data.item.name,
          artists: res.data.item.artists.map((artist) => artist.name),
          image: res.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }
    };
    getCurrentTrack(); 
  },[token,dispatch])
  return (
    <div className='current-track__container'>
      {
        currentlyPlaying && (
          <div className="current-track">
            <div className="current-track__image">
              <img src={currentlyPlaying.image} alt='track Image'/>
            </div>
            <div className="current-track__info">
              <h4>{currentlyPlaying.name}</h4>
              <h6>{currentlyPlaying.artists}</h6>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default CurrentTrack