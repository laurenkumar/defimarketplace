import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./SafemoonStats.css";

function SafemoonStats() {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/safemoon'
      )
      .then(res => {
        setStats(res.data);
      })
      .catch(error => console.log(error))
  }, []);

  const [safemoon, setSafemoonPrice] = useState("");

  useEffect(() => {
    const safemoonPrice = async () => {
      axios.get("https://api.pancakeswap.info/api/v2/tokens/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3").then(res=>{
          const safemoonPrice = parseFloat(res.data.data.price);
          setSafemoonPrice(safemoonPrice);
      }).catch(err => console.log(err));
    }

    safemoonPrice();
  }, [safemoon]);

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const monthsDiff = function(endDate) {
    const monthDifference =  moment(new Date(endDate)).diff(new Date(), 'months', true);

    return Math.abs(Math.round(parseFloat(monthDifference)));
  }

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

  const getSupplyDone = () => {
    const percent = stats?.market_data?.circulating_supply * 100 / stats?.market_data?.total_supply;
    return Math.round(parseFloat(percent));
  }

  const getOpenPercent = () => {
    const percent = 100 - (stats?.developer_data?.closed_issues * 100 / stats?.developer_data?.total_issues);

    return Math.round(parseFloat(percent));
  }

  return (
    <section>
      <div> 
        <div>
          <h2 className="coin-text">Safemoon Stats</h2>
          <div>
            <div className="flex">
              <div className="bold crypto-price">${stats?.market_data?.current_price?.usd}</div> 
              <div className={Math.sign(stats?.market_data?.price_change_percentage_24h) === -1 ? 'red' : 'green'}>
                  <span>{stats?.market_data?.price_change_percentage_24h}%</span>
              </div>
            </div>
          </div> 
          <div className="flex justify-content-between">
            <div>
              <span className="small-title">Market Cap
              </span> 
              <div className="center">{getNumber(stats?.market_data?.market_cap?.usd)}
              </div>
            </div> 
            <div>
              <span className="small-title">Circulating Supply
              </span> 
              <div className="center">
                <span>{getNumber(stats?.market_data?.circulating_supply)}</span> 
              </div>
            </div> 
            <div>
              <span className="small-title">Total Supply</span> 
              <div className="center">{getNumber(stats?.market_data?.total_supply)}</div>
            </div>
          </div>  
          <div> 
            <div className="crypto-bar">
              <LinearProgressWithLabel value={getSupplyDone()} />
            </div> 
            <span className="crypto-caption">{getSupplyDone()}% of total supply ({getNumber(stats?.market_data?.total_supply)})
            </span> 
          </div>
          <div className="flex pancake">
              <span className="bold">PancakeSwap (v2) Price
              </span> 
              <div className="bold">${parseFloat(safemoon).toFixed(9).replace(/\.?0+$/,"")}
              </div>
          </div>
          <div>
            <table>
              <caption><h3>Market Data</h3></caption>
              <tbody>
                <tr>
                  <th scope="row">Market Cap Rank</th> 
                  <td>
                    <div>#{stats?.market_data?.market_cap_rank}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">CoinGecko Rank</th> 
                  <td>
                    <div>#{stats?.coingecko_rank}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">CoinGecko Overall Score</th> 
                  <td>
                    <div>{Math.round(parseFloat(stats?.coingecko_score))}%</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">CoinGecko Liquidity Score</th> 
                  <td>
                      <div>{Math.round(parseFloat(stats?.liquidity_score))}%</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">All Time High</th> 
                  <td>
                    <div>${stats?.market_data?.ath?.usd}</div> 
                    <div className="crypto-caption">{monthsDiff(stats?.market_data?.ath_date?.usd)} months ago</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">All Time Low</th> 
                  <td>
                    <div>${stats?.market_data?.atl?.usd.toFixed(8).replace(/\.?0+$/,"")}</div> 
                    <div className="crypto-caption">{monthsDiff(stats?.market_data?.atl_date?.usd)} months ago</div>
                  </td>
                </tr>
              </tbody>
            </table> 
             
            <table>
              <caption><h3>Community Data</h3></caption>
              <tbody>
                <tr>
                  <th scope="row">CoinGecko Community Score</th> 
                  <td>
                    <div>{stats?.community_score}%</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Reddit Subscribers</th> 
                  <td>
                    <div>{kFormatter(stats?.community_data?.reddit_subscribers)}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Twitter Followers</th> 
                  <td>
                    <div>{getNumber(stats?.community_data?.twitter_followers)}</div>  
                  </td>
                </tr>
              </tbody>
            </table> 
             
            <table>
              <caption><h3>Developer Data</h3></caption>
              <tbody>
                <tr>
                  <th scope="row">CoinGecko Developer Score</th> 
                  <td>
                    <div>{stats?.developer_score}%</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Number of Stars</th> 
                  <td>
                    <div>{stats?.developer_data?.stars}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Contributors</th> 
                  <td>
                    <div>{stats?.developer_data?.pull_request_contributors}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Forks</th> 
                  <td>
                    <div>{stats?.developer_data?.forks}</div>
                  </td>
                </tr> 
                <tr>
                  <th scope="row">Issues</th> 
                  <td>
                    <div>{stats?.developer_data?.total_issues}</div> 
                    <div className="crypto-caption">{getOpenPercent()}% open</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </section>
  );
}

export default SafemoonStats;