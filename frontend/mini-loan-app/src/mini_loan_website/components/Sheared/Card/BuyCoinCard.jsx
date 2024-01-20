import React from "react";
import style from "./card.module.css";
import { serverImg } from "../../../../../serverURL";
const BuyCoinCard = ({ coin,price, children }) => {
  return (
    <>
      <div className={style.buycoin_card_container}>
        <div className={style.buycoin_card_wrapper}>
          <img src={`${serverImg}/coin.png`} alt="coin" />
          <div className={style.buycoin_card_price_wrapper}>
            <h1>{coin}</h1>
            <span>coin</span>
          </div>
        </div>
        <div className={style.buycoin_card_details}>
            <h1>{price}</h1>
            <span>INR</span>
        </div>
        {children}
      </div>
    </>
  );
};

export default BuyCoinCard;
