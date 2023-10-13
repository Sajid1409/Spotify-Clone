import React, { useEffect } from 'react'
import {AiFillClockCircle} from 'react-icons/ai';
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

const Body = ({headerBackground}) => {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
  useStateProvider();

useEffect(() => {
  const getInitialPlaylist = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith("<a")
        ? ""
        : response.data.description,
      image: response.data.images[0].url,
      tracks: response.data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album: track.album.name,
        context_uri: track.album.uri,
        track_number: track.track_number,
        date_added: track.added_at,
      })),
    };
    dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
  };
  getInitialPlaylist();
  
}, [token, dispatch, selectedPlaylistId]);

  const getMsToMinutesAndSecond=(ms)=>{
    let seconds=ms/1000;
    let minutes=Math.trunc(seconds/60);
    seconds=(seconds%60).toFixed(0);
    return minutes+":" +(seconds<10?"0" : "") + seconds;
  }

  const playTrack = async (id,name,artists,image,context_uri,track_number)=>{
    const res=await axios.put('https://api.spotify.com/v1/me/player/play',
    {
      context_uri,
      offset:{
        position:track_number-1,
      },
      position_ms:0,
    },
    {
      headers: {
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      }
    })
    if(res.status===204){
      const currentlyPlaying={
        id,name,artists,image,
      }
      dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
    }
    else{
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
    }
  }
  return (
    <div className='playlist__container'>
      {selectedPlaylist && (
        <>
        <div className="playlist__list">
          <div className="playlist__image">
            <img src={selectedPlaylist.image} alt ='selectedplaylist'/>
          </div>
          <div className="playlist__details">
            <span className='playlist__type'>PLAYLIST</span>
            <h1 className='playlist__title'>{selectedPlaylist.name}</h1>
            <p className='playlist__description'>{selectedPlaylist.description}</p>
          </div>
        </div>
        <div className="list">
             <div className={"playlist__header-row" + (headerBackground?" row-dark": "")}>
              <div className="playlist__header-col">
                <span>#</span>
              </div>
              <div className="playlist__header-col">
                <span>TITLE</span>
              </div>
              <div className="playlist__header-col">
                <span>ALBUM</span>
              </div>
              <div className="playlist__header-col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
             </div>
             <div className="tracks">
              {
                selectedPlaylist.tracks.map(({
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                  date_added,
                },index)=>{
                  return (
                    <div className="tracks__row" key={id} onClick={()=>playTrack(id,name,artists,image,context_uri,track_number)}>
                      <div className="tracks__col">
                        <span>{index+1}</span>
                      </div>
                      <div className="tracks__col detail">
                        <div className='track__image'>
                         <img src={image} alt='track'/>
                        </div>
                        <div className="track__info">
                        <span className='track__name'>{name}</span>
                        <span>{artists}</span>
                      </div>
                      </div>
                      <div className="tracks__col">
                        <span>{album}</span>
                      </div>
                      <div className="tracks__col">
                        <span>{getMsToMinutesAndSecond(duration)}</span>
                      </div>
                    </div>
                  )
                })
              }
             </div>
          </div>
       
        </>
      )}
    </div>
  )
}

export default Body