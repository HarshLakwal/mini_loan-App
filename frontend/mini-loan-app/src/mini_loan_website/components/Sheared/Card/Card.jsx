import React from "react";
import style from "./card.module.css";
import { serverImg } from "../../../../../serverURL.js";

const Card = ({ img, name, price, children }) => {
  return (
    <>
        <div className={style.card_container}>
          <img src={`${serverImg}/${img}`} alt="img" />
          <div className={style.card_details}>
            <span>{name}</span>
            <span>{price} coin</span>
          </div>
          {children}
        </div>
    </>
  );
};

export default Card;
