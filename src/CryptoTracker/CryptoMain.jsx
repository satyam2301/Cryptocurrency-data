import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import './CryptoMain.css'

const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const CryptoMain = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const func = async () => {
      try {
        const res = await axios.get(api);
        // console.log(res);
        const result = await res.data;
        setCoins(result);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
        <div className="logo">
            <img src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300" alt="logo"/>
        </div>
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search..."
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            image={coin.image}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
};

export default CryptoMain;
