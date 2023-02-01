import React, { useState, useEffect } from "react";

//API
import { getCoin } from "../services/api";

//Components
import Loader from "./Loader";
import Coins from "./Coins";

//Styles
import styles from "./Landing.module.css";

const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  //Watcher

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getCoin();
      setCoins(data);
    };

    fetchAPI();
  }, []);

  //Handler

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  //Search Input

  const searchCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="serach"
        value={search}
        onChange={searchHandler}
      />
      {coins.length ? (
        <div className={styles.coinContainer}>
          {searchCoins.map((coin) => (
            <Coins
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              marketCap={coin.market_cap}
              priceChange={coin.price_change_percentage_24h}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Landing;
