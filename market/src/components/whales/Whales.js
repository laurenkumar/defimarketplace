import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import BigNumber from "bignumber.js";
import "./Whales.css";

function Whales() {
  const [safemoonAddressOne, setSafemoonOne] = useState([]);
  const [safemoonAddressTwo, setSafemoonTwo] = useState([]);
  const [safemoonAddressThree, setSafemoonThree] = useState([]);
  const [safemoonAddressFour, setSafemoonFour] = useState([]);
  const [safemoonAddressFive, setSafemoonFive] = useState([]);
  const [safemoonAddressSix, setSafemoonSix] = useState([]);
  const [safemoonAddressSeven, setSafemoonSeven] = useState([]);
  const [safemoonAddressEight, setSafemoonEight] = useState([]);
  const [safemoonAddressNine, setSafemoonNine] = useState([]);
  const [safemoonAddressTen, setSafemoonTen] = useState([]);

  let one = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0x86b695aaa2600668cec754c7827357626b188054&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let two = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0xdbe831064ae9b8646de09f270eef3f0076ce9def&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let three = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0x82b7503bffd8aea31aea5ee14fb01959191af45b&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let four = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0xf55808ac8291551ed8faf5674449238dff44c041&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let five = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0x0c8c62a7f883c6e47c8c5790474d4eb8a48924f2&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let six = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0xd51d1d5503dcff819e214faa66c3b6f0ebb06abe&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let seven = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0xa803fc1c1e83d6389865e1248dc924ed4c6953de&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let eight = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0xafa5ebe249e86127fe7a63e14a0b06b4e42222f8&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let nine = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0x424c7cde3dcb32ac7951e9c79f2f5f00625c384b&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";
  let ten = "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3&address=0x8c7de13ecf6e92e249696defed7aa81e9c93931a&apikey=DG87ABXXWMX1NV9BDFXJFUXVK34J9DRQJP";

  useEffect(() => {
    axios
      .get(
        one
      )
      .then(res => {
        setSafemoonOne(res.data.result);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    axios
      .get(
        two
      )
      .then(res => {
        setSafemoonTwo(res.data.result);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        three
      )
      .then(res => {
        setSafemoonThree(res.data.result);
      })
      .catch(error => console.log(error)), 50);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        four
      )
      .then(res => {
        setSafemoonFour(res.data.result);
      })
      .catch(error => console.log(error)), 50);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        five
      )
      .then(res => {
        setSafemoonFive(res.data.result);
      })
      .catch(error => console.log(error)), 50);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        six
      )
      .then(res => {
        setSafemoonSix(res.data.result);
      })
      .catch(error => console.log(error)), 1450);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        seven
      )
      .then(res => {
        setSafemoonSeven(res.data.result);
      })
      .catch(error => console.log(error)), 1450);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        eight
      )
      .then(res => {
        setSafemoonEight(res.data.result);
      })
      .catch(error => console.log(error)), 1450);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        nine
      )
      .then(res => {
        setSafemoonNine(res.data.result);
      })
      .catch(error => console.log(error)), 1450);
  }, []);

  useEffect(() => {
    setTimeout(() => axios
      .get(
        ten
      )
      .then(res => {
        setSafemoonTen(res.data.result);
      })
      .catch(error => console.log(error)), 1300);
  }, []);

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

  const whalesSum = safemoonAddressOne/1000000000 + safemoonAddressTwo/1000000000 + safemoonAddressThree/1000000000 + safemoonAddressFour/1000000000 + safemoonAddressFive/1000000000 + safemoonAddressSix/1000000000 + safemoonAddressSeven/1000000000 + safemoonAddressEight/1000000000 + safemoonAddressNine/1000000000 + safemoonAddressTen/1000000000;

  const dominance = whalesSum * 100 / stats?.market_data?.circulating_supply;

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
    <div>
      <h2 className="coin-text">Top Ten Safemoon whales</h2>   
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0x86b695aaa2600668cec754c7827357626b188054</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressOne/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0xdbe831064ae9b8646de09f270eef3f0076ce9def</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressTwo/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0x82b7503bffd8aea31aea5ee14fb01959191af45b</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressThree/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0xf55808ac8291551ed8faf5674449238dff44c041</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressFour/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0x0c8c62a7f883c6e47c8c5790474d4eb8a48924f2</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressFive/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0xd51d1d5503dcff819e214faa66c3b6f0ebb06abe</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressSix/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0xa803fc1c1e83d6389865e1248dc924ed4c6953de</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressSeven/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0xafa5ebe249e86127fe7a63e14a0b06b4e42222f8</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressEight/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0x424c7cde3dcb32ac7951e9c79f2f5f00625c384b</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressNine/1000000000)}</span>
        </div>
      </div>
      <div className="flex justify-content-between whale">
        <div>
          <div className="crypto-caption">Address</div>
          <span>0x8c7de13ecf6e92e249696defed7aa81e9c93931a</span>
        </div>
        <div>
          <div className="crypto-caption">Balance</div>
          <span>{getNumber(safemoonAddressTen/1000000000)}</span>
        </div>
      </div>
      <div>Top 10 Whales own <span className="upside">{dominance}%</span> of the circulating supply.</div>
    </div>
  );
}

export default Whales;