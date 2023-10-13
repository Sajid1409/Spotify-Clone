import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import VolumeControl from './VolumeControl'

const Footer = () => {
  return (
    <div className='footer'>
      <CurrentTrack/>
      <PlayerControls/>
      <VolumeControl/>
    </div>
  )
}

export default Footer