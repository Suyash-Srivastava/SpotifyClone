import React from "react";
import styles from "./SearchBar.module.css";

import search_icon from '../../assets/images/svg/searchicon.svg'

const SearchBar = (props) => {
  const {searchTerm,setSearchTerm}=props
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search Songs,Artist" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <img className={styles.search_icon} src={search_icon} alt="search icon" />
    </div>
  );
};

export default SearchBar;
