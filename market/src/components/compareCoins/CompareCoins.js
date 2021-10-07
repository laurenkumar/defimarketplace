import React, { useState, useEffect } from 'react';
import "./CompareCoins.css";
import axios from 'axios';
import moment from 'moment';
import BigNumber from "bignumber.js";

function CompareCoins() {
  let count = 1;
  let count2 = 1;
  const [stats, setStats] = useState([]);
  const [safemoon, setSafemoon] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setStats(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=safemoon&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setSafemoon(res.data[0]);
      })
      .catch(error => console.log(error));
  }, []);

  const getNumber = function(num) {
    const units = ["M","B","T","Q"]
    const unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length);
    const r = unit%3;
    const x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2);

    return x.toFixed(2) + units[Math.floor(unit / 3) - 2];
  }

  const kFormatter = function(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  return (
    <div className="compare-dashboard">
      <section>
        <h2 className="coin-text">What if SafeMoon reached the market cap of... <span className="crypto-caption">(With a circulating supply of 100T)</span> </h2>
        {stats?.map((coin) => (
          <div className="coin-container">
            <div className="coin-compare-init coin-infos">
              <div className="coin-count">{count++}</div>
              <div className="coin-infos first-coin">
                <div className="coin-img">
                  <img src={coin.image} alt={"icon of " + coin.name} />
                </div>
                <div className="coin-name">
                  <div><span>{coin.symbol}</span></div>
                  <div><span>{coin.name}</span></div>
                </div>
              </div>
              <div className="coin-market-cap">${getNumber(coin.market_cap)}</div>
            </div>

            <div className="coin-compare-safe coin-infos">
              <div className="coin-img">
                <img src={safemoon.image} alt={"icon of " + safemoon.name} />
              </div>
              <div className="coin-name">
                <span>{safemoon.name}</span>
              </div>
              <div className="coin-potential">
                <div>
                  <span>Current Safemoon Price</span>
                  <div><span>${safemoon.current_price}</span></div>
                </div>
                <div>
                  <span>Potential Price</span>
                  <div><span className="up-text">${(coin.market_cap / 100000000000000).toFixed(5)}</span></div>
                </div>
                <div>
                  <span>Potential Upside</span>
                  <div><span className="upside">{((coin.market_cap / 100000000000000) / safemoon.current_price).toFixed()}x</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h2 className="coin-text">Reflections (per B) if SafeMoon reached the same volume than... <span className="crypto-caption">(With a circulating supply of 100T)</span> </h2>
        {stats?.map((coin) => (
          <div className="coin-container">
            <div className="coin-compare-init coin-infos">
              <div className="coin-count">{count2++}</div> 
              <div className="coin-infos first-coin">
                <div className="coin-img">
                  <img src={coin.image} alt={"icon of " + coin.name} />
                </div>
                <div className="coin-name">
                  <div><span>{coin.symbol}</span></div>
                  <div><span>{coin.name}</span></div>
                </div>
              </div>
              <div className="coin-market-cap">${getNumber(coin.total_volume)}</div>
            </div>

            <div className="coin-compare-safe coin-infos">
              <div className="coin-img">
                <img src={safemoon.image} alt={"icon of " + safemoon.name} />
              </div>
              <div className="coin-name">
                <span>{safemoon.name}</span>
              </div>
              <div className="coin-potential">
                <div>
                  <span>Potential Price</span>
                  <div><span className="up-text">${(coin.market_cap / 100000000000000).toFixed(5)}</span></div>
                </div>
                <div>
                  <span>Reflections Per Day</span>
                  <div><span className="upside">${((1000000000/(2*10000000000000000)*coin.total_volume)).toFixed()}</span></div>
                  <div><span className="upside">{((1000000000/(2*10000000000000000)*coin.total_volume)/(coin.market_cap / 100000000000000)).toFixed()}</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CompareCoins;