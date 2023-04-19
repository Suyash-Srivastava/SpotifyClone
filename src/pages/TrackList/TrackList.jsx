import React, { useEffect, useState } from "react";
import styles from "./TrackList.module.css";
import song_cover from "../../assets/images/svg/song_cover.svg";
import { MenuItems } from "../../shared/config";
import SearchBar from "../../componets/SearchBar/SearchBar";
import Loader from '../../componets/SearchBar/Loaders/Loader' 

const TrackList = (props) => {
  const {
    searchTerm,
    setSearchTerm,
    currentTrack,
    setCurrenTrack,
    currentMenuOption,
    optionSelected,
    songList,
    songPlaying,
    setSongPlaying,
  } = props;

  const [MenuTitle, setMenuTitle] = useState("");

  useEffect(() => {
    setOptionSelected();
  }, [currentMenuOption, optionSelected]);

  useEffect(() => {}, []);

  function setOptionSelected() {

    if(currentMenuOption===undefined)
    return

    let optionTitle = currentMenuOption.filter((option) => {
      if (option.id === optionSelected) return option.title;
    });
    setMenuTitle(optionTitle[0]?.title);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>{MenuTitle}</div>
      <div className={styles.search_box}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={styles.song_list}>
      {songList===undefined && <Loader text="Playlist"/>}
        {songList?.map((song) => {
          return (
            <div
              className={songPlaying?._id===undefined || songPlaying?._id!==song._id?styles.song_container:styles.song_container+" "+styles.highlight_song}
              key={song._id}
              onClick={() => setSongPlaying(song)}
            >
              <div className={styles.song_cover_img}>
                <img src={song.photo} alt="cover" />
              </div>
              <div className={styles.song_title_album}>
                <div className={styles.song_title}>{song.title}</div>
                <div className={styles.song_album}>{song.artist}</div>
              </div>
              <div className={styles.song_duration}>{(song?.duration+"").charAt(0)+":"+(song?.duration+"").substring(1)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
