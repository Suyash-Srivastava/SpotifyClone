import React, { useState } from "react";
import styles from "./Menu.module.css";
import Logo from "../../assets/images/svg/Logo.svg";

import { MenuItems } from "../../shared/config";
import Loader from "../../componets/SearchBar/Loaders/Loader";

const Menu = (props) => {
  const { currentMenuOption, setCurrentMenuOption , optionSelected , setOptionSelected } = props;

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} alt="Spotify" />
      </div>
      <div className={styles.menu_item_container}>
        {currentMenuOption===undefined && <Loader text='Menu'/>}
        {currentMenuOption?.map((Item) => {
          return (
            <div
            key={Item?.id}
              className={
                Item?.id===optionSelected? styles.item+" "+styles.active_item : styles.item
              }
              onClick={()=>setOptionSelected(Item?.id)}
            >
              {Item?.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
