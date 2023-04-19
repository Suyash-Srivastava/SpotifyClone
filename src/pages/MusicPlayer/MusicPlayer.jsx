import React, { useEffect } from 'react'
import styles from './MusicPlayer.module.css'

import Cover from '../../assets/images/svg/Cover.svg'
import mock_song from '../../assets/audio/mock_song.MP3'
import Loader from '../../componets/SearchBar/Loaders/Loader'

const MusicPlayer = (props) => {

  const {songPlaying}=props
  
  if(songPlaying===null){
    return <div className={styles.container}>Please Select a Song ...</div>
  }


  return (
    <div className={styles.container} key={songPlaying._id}>
      <div className={styles.inner_container}>
      <div className={styles.empty_header}></div>
    <div className={styles.track_title}>{songPlaying.title}</div>
    <div className={styles.artist}>{songPlaying.artist}</div>
    <div className={styles.cover_photo}><img src={songPlaying.photo} alt="cover" /> </div>
    <div className={styles.audio_controller}>
      <audio src={songPlaying.url} controls autoPlay></audio>
    </div>
    </div>
      </div>
  )
}

export default MusicPlayer