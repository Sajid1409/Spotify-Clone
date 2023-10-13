import React from 'react';
import logo from '../logo.png';

const Login = () => {
  const handleClick=()=>{
    const clientId='e610766150ca44668b37c82e61bd8dbe';
    const redirectUrl='http://localhost:3000/';
    const apiUrl='https://accounts.spotify.com/authorize';
    const scope=["user-read-email",
      "user-read-private","user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing", "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public","user-read-playback-position",
      'user-top-read',
      "user-read-recently-played","app-remote-control",
      "streaming","app-remote-control"];
    window.location.href=`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  };
  return (
    <div className='login-container'>
      <img
       src={logo}
       alt="spotify-logo"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
  )
}

export default Login;