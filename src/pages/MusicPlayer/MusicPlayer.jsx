import React, { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

import Cover from "../../assets/images/svg/Cover.svg";
import mock_song from "../../assets/audio/mock_song.MP3";
import audio_menu_icon from "../../assets/images/svg/player_menu_icon.svg";
import audio_next from "../../assets/images/svg/prev_icon.svg";
import audio_prev from "../../assets/images/svg/next_icon.svg";
import audio_play from "../../assets/images/svg/play_icon.svg";
import audio_pause from "../../assets/images/svg/pause_icon.svg";
import volume_btn from "../../assets/images/svg/volume_btn.svg";

const MusicPlayer = (props) => {
  const { songPlaying, setSongPlaying, songList } = props;

  const [isSongPlaying, setisSongPlaying] = useState(true);

  const audio_player = useRef(null);

  async function playPauseBtn() {
    if (audio_player.current?.paused) {
      await audio_player.current.play();
      setisSongPlaying(true);
    } else {
      await audio_player.current.pause();
      setisSongPlaying(false);
    }
  }

  async function nextOrPrevSong(command) {
    let currentSongIndex = undefined;
    songList.forEach((song, index) => {
      if (song._id === songPlaying._id) {
        currentSongIndex = index;
      }
      return;
    });
    if (
      currentSongIndex === undefined ||
      (currentSongIndex - 1 < 0 && command === 0) ||
      (currentSongIndex + 1 >= songList.length && command === 1)
    ) {
      setSongPlaying(songList[0]);
    } else if (command === 0) {
      setSongPlaying(songList[currentSongIndex - 1]);
    } else if (command === 1) {
      setSongPlaying(songList[currentSongIndex + 1]);
    }
  }

  if (songPlaying === null) {
    return <div className={styles.container}>Please Select a Song ...</div>;
  }

  return (
    <div className={styles.container} key={songPlaying._id}>
      <div className={styles.inner_container}>
        <div className={styles.empty_header}></div>
        <div className={styles.track_title}>{songPlaying.title}</div>
        <div className={styles.artist}>{songPlaying.artist}</div>
        <div className={styles.cover_photo}>
          <img src={songPlaying.photo} alt="cover" />
        </div>
        {/* <progress ></progress> */}
        <div className={styles.audio_controller}>
          <audio ref={audio_player} src={songPlaying.url} autoPlay loop></audio>
          <div className={styles.audio_controller_menu}>
            <img src={audio_menu_icon} alt="audio menu" />
          </div>
          <div className={styles.audio_controller_actions}>
            <img
              src={audio_prev}
              alt="Previous"
              onClick={() => nextOrPrevSong(0)}
            />
            <img
              src={isSongPlaying ? audio_pause : audio_play}
              alt={isSongPlaying ? "Pause" : "Play"}
              onClick={playPauseBtn}
            />
            <img
              src={audio_next}
              alt="Next"
              onClick={() => nextOrPrevSong(1)}
            />
          </div>
          <div className={styles.audio_controller_volume}>
            <img src={volume_btn} alt="volume menu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
