import React, { useState, useEffect } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import DropdownCoinList from './DropdownCoinList';
import { format, sub, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Charts = ({ filteredCoins }) => {

  let priceData = [];
  let price = [];
  let dates;

  const [coin, setCoin] = useState();
  const [chartData, setChartData] = useState({})


  const chart = () => {

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '100'
          }
        })
      .then(res => {
        priceData = res.data.prices.map( e => { return e})
        getDates();
        getPrices();
        historicalChart();
    })
    .catch(error => console.log(error))
}

  const getDates = () => {

    const todaysDate = new Date();
    const daysBack = sub(todaysDate, {days: 100});
    const range = eachDayOfInterval(
    { start: daysBack, end: todaysDate })

    const rangeFormatted = range.map((el) => {
      const dateFormatted = format(el, 'MM/dd/yy');
      return dateFormatted
    });
    dates = rangeFormatted
  }

  const getPrices = () => {
    const targetData = [];
    Object.values(priceData).forEach(val => {
      targetData.push(val[1]); 
    });
    price = targetData.map( e => { return e});
  }

  const historicalChart =() => {
      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'daily closes in USD',
            data: price,
            fill: false,
            backgroundColor: 'rgb(120, 202, 200)',
            borderColor : 'green',
            tension: 0.5
          }
        ]
      })
  }

useEffect( () => {
  chart();
  // eslint-disable-next-line
}, [coin,]);
    return (
          <div>
            <DropdownCoinList id='dropdown'  filteredCoins={filteredCoins} setCoin={setCoin} coin={coin} />
            <Line
                data={chartData}
                height={400}
                width={900}
                options={{
                    maintainAspectRatio: true,
                    responsive: true
                }}
             />
          </div>
        )
}

export default Charts
