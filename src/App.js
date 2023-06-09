import { useState } from "react";
import "./App.css";
import Menu from "./pages/Menu/Menu";
import MusicPlayer from "./pages/MusicPlayer/MusicPlayer";
import TrackList from "./pages/TrackList/TrackList";
import { useEffect } from "react";

import defaultCover from "./assets/images/png/deafultBackground.jpg";

function App() {
  const [optionSelected, setOptionSelected] = useState(1);
  const [currentMenuOption, setCurrentMenuOption] = useState(undefined);
  const [currentTrack, setCurrenTrack] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [songList, setSongList] = useState(undefined);
  const [songPlaying, setSongPlaying] = useState(null);

  useEffect(() => {
    getMenuOptions();
    getPlaylistSongs();
  }, []);

  useEffect(() => {
    getPlaylistSongs();
  }, [optionSelected]);

  useEffect(() => {
    let deboncedSearch;

    if (deboncedSearch) clearTimeout(deboncedSearch);
    else deboncedSearch = setTimeout(getPlaylistSongs, 500);
  }, [searchTerm.length]);

  async function getMenuOptions() {
    let playListData = await fetch("https://api.ss.dev/resource/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
      getPlaylists {
        id
        title
      }
    }
    `,
      }),
    });
    playListData = await playListData.json();
    playListData = await playListData.data.getPlaylists;
    setCurrentMenuOption(playListData);
  }
  async function getPlaylistSongs() {
    let res = await fetch("https://api.ss.dev/resource/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          
          getSongs(playlistId: ${optionSelected}, search:"${searchTerm}") {
            _id
            artist
            duration
            photo
            title
            url
          }
        }    
    `,
      }),
    });
    let songListJSON = await res.json();
    let songListArray = await songListJSON.data.getSongs;
    setSongList(songListArray);
  }

  return (
    <div className="App">
      <img
        src={songPlaying ? songPlaying?.photo : defaultCover}
        className="dynamicBackDrop"
        alt="backdrop"
      ></img>
      <div className="maincontainer">
        <Menu
          currentMenuOption={currentMenuOption}
          setCurrentMenuOption={setCurrentMenuOption}
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
        />
        <TrackList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentTrack={currentTrack}
          setCurrenTrack={setCurrenTrack}
          currentMenuOption={currentMenuOption}
          optionSelected={optionSelected}
          songList={songList}
          songPlaying={songPlaying}
          setSongPlaying={setSongPlaying}
        />
        <MusicPlayer
          currentTrack={currentTrack}
          songPlaying={songPlaying}
          setSongPlaying={setSongPlaying}
          songList={songList}
        />
      </div>
    </div>
  );
}

export default App;
