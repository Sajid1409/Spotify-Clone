import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const ProgressBar = () => {
  const [{token}] = useStateProvider();
  const [progress, setProgress]=useState(0);
  const [playedDuration, setPlayedDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const getMsToMinutesAndSecond=(ms)=>{
    let seconds=ms/1000;
    let minutes=Math.trunc(seconds/60);
    seconds=(seconds%60).toFixed(0);
    return minutes+":" +(seconds<10?"0" : "") + seconds;
  }
  const fetchCurrentlyPlaying = async () => {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    return response.data;
  };
  useEffect(() => {
    const fetchProgress = async () => {
      const currentlyPlaying = await fetchCurrentlyPlaying();
      if (currentlyPlaying) {
        const songProgress = (currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100;
        setProgress(songProgress);
        setPlayedDuration(getMsToMinutesAndSecond(currentlyPlaying.progress_ms));
        setTotalDuration(getMsToMinutesAndSecond(currentlyPlaying.item.duration_ms));
      }
    };

    const interval = setInterval(() => {
      fetchProgress();
    }, 1000);
  
    return () => clearInterval(interval);
  }, [token]);
  /* const seekTo = async (positionMs)=>{
    await axios.put(
      'https://api.spotify.com/v1/me/player/seek',
      { position_ms: positionMs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      }
    );
  }
  const handleSeek=(e)=>{
    const newPosition = (e.nativeEvent.offsetX / e.target.offsetWidth) * 100;
    const newPositionMs = (newPosition / 100) * progress.duration_ms;
    setProgress({ ...progress, position_ms: newPositionMs });
    seekTo(newPositionMs);
  } */
  return (
    <div className='progress-bar__container'>
    <h6 style={{color:"white"}}>{playedDuration}</h6>
    <div style={{ width: '100%', height: '5px', backgroundColor: 'gray', position: 'relative',display:'flex', borderRadius:'1rem' }} >
    <div className="progress-bar" style={{width:`${progress}%`, height:"5px", backgroundColor:"green", position:'absolute'}}></div>
    </div>
    <h6 style={{color:"white"}}>{totalDuration}</h6>
    </div>
  )
}

export default ProgressBar