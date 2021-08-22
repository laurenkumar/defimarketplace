import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './News.css'

const CoinFilter = ({coins, setCoins}) => {

  const [toggle, setToggle] = useState('');

  const sortByPercent = () => {
    const byChange = coins.sort((a ,b) =>
    toggle ? (setToggle(false), a.price_change_percentage_24h-b.price_change_percentage_24h)
    : (setToggle(true), b.price_change_percentage_24h -a.price_change_percentage_24h)
    );
    setCoins(byChange)
};

  const sortByVolume = () => {
    const byChange = coins.sort((a,b) =>
      toggle ? (setToggle(false), a.total_volume - b.total_volume)
      : (setToggle(true), b.total_volume - a.total_volume)
      );
    setCoins(byChange)
  }

  const sortByPrice = () => {
    const byChange = coins.sort((a,b) =>
      toggle ? (setToggle(false), a.current_price - b.current_price)
      : (setToggle(true), b.current_price - a.current_price)
      );
    setCoins(byChange)
  }

  const sortByMarketcap = () => {
    const byChange = coins.sort((a,b) =>
      toggle ? (setToggle(false), a.market_cap - b.market_cap)
      : (setToggle(true), b.market_cap - a.market_cap)
      );
    setCoins(byChange)

  }

  const sortByNameDescending = () => {
    const byChange = coins.sort((a,b) => {
      if (a.symbol < b.symbol) return - 1;
      else if ( a.symbol > b.symbol ) return 1;
      return 0;
      });
    setCoins(byChange);
    setToggle(false);
  };

  const sortByNameAscending = () => {
    const byChange = coins.sort((a,b) => {
      if (b.symbol < a.symbol) return - 1;
      else if ( b.symbol > a.symbol ) return 1;
      return 0;
      });
    setCoins(byChange);
    setToggle(true);
  }


     return (
      <div className="filter-market"> 
        <h2 style={{color:"black"}}>Filter by:</h2>
        <Button onClick={toggle ? sortByNameDescending : sortByNameAscending} variant="outline-success"> Name</Button>   
        <Button onClick={sortByPrice} variant="outline-success"> Price </Button>  
        <Button onClick={sortByVolume} variant="outline-success"> Vol </Button>
        <Button onClick={sortByPercent} variant="outline-success"> % </Button>
        <Button onClick={sortByMarketcap} variant="outline-success"> MktCap </Button>
      </div>
    )
}

export default CoinFilter
