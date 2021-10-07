import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Charts from './Charts';
import List from './List.js';
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import './News.css';

function News() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const onClick = () => {
    showCharts ? (setShowCharts(false)) : (setShowCharts(true))
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return ( 
    <main className='coin-app'>
      <h1 className='coin-text'>Market overview</h1>
      <header className='header__market'>
        <div className='header__search coin-search'>
          <form>
            <SearchRoundedIcon className="header__searchIcon" />
            <input
              role="searchbox"
              className='coin-input'
              type='search'
              title='Search'
              aria-label='Search your crypto...'
              onChange={handleChange}
              placeholder='Search your crypto...'
            />
          </form>
        </div>
        <div className="buttons">
          <button type="button" title="See the data of the cryptocurrencies" aria-label="See the data of the cryptocurrencies" className="buttonSecondary" onClick={onClick}>{showCharts ? `List` : `Charts`}</button>
        </div>
      </header>
      <section>
        {showCharts ? <Charts
          filteredCoins={filteredCoins}/> :
          <List filteredCoins={filteredCoins} setCoins={setCoins} />}
      </section>
    </main>
  );
}

export default News;