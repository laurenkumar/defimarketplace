import React from 'react';
import CoinFilter from './CoinFilter.js'
import Coin from './Coin';

const List = ({ filteredCoins, setCoins }) => {

    return (
      <div>
      <CoinFilter coins={filteredCoins} setCoins={setCoins}/>
        <br></br>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
      </div>
    )
}

export default List
