import axios from "axios";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Link } from "react-router-dom";

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const carousel = {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }; 

  //   Getting the data from coingecko api
  const fetchTrendingData = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    // const { data } = await axios.get(options);
    setTrending(data);
  };

  //   We are going to call fetchtrending data when the component is rendered for the first time
  useEffect(() => {
    fetchTrendingData();
  }, [currency]);

  // console.log(trending);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    console.log(profit);
    return (
      <Link style={carousel} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        ></img>
        <span>
          &nbsp;
          {coin?.symbol}
          <span style={{ color : profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight:500 }}>
            {profit==="true" ? "-" : "+"} {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price?.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        // items={items}
      />
    </div>
  );
};

export default Carousel;
