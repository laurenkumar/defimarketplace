import React, { useState, useEffect } from 'react';
import './Calcul.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Calcul() {
  const classes = useStyles();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("");
  const [part, setPart] = useState("");
  const [reflectionDayDollar, setReflectionDayDollar] = useState("");
  const [reflectionDay, setReflectionDay] = useState("");
  const [dailyRoi, setDailyRoi] = useState("");
  const [yearRoi, setYearRoi] = useState("");

  const handleSubmit = async (e) => {
    console.log(e.target.id)
    if(e.target.id === "quantity") {
      await setQuantity(e.target.value);
    } else if (e.target.id === "price") {
      await setPrice(e.target.value);
    } else if (e.target.id === "volume") {
      await setVolume(e.target.value);
    }
  };

  useEffect(()=> {
    setReflectionDayDollar(quantity/(2*10000000000000000)*volume);
  },[quantity, volume]);

  useEffect(()=> {
    setReflectionDay(reflectionDayDollar/price);
  },[reflectionDayDollar, price])

  useEffect(()=> {
    setDailyRoi(reflectionDay/quantity*100);
  },[reflectionDay, quantity])

  useEffect(()=> {
    setYearRoi((((1 + dailyRoi/100)**365) - 1) * 100);
  },[dailyRoi])

  return (
    <div className='coin-app calcul-dashboard'>
      <h1 className='coin-text'>SafeMoon Simple Calculator</h1>
      <div className="calculator-container">
        <div>
          <form className={classes.root}>
            <div>
              <TextField type="number"
                    value={quantity}
                    onChange={(e) => handleSubmit(e)}
                    placeholder='Safemoon Quantity' 
                    id="quantity" 
                    label="Set SafeMoon Quantity" variant="outlined"
              />
            </div>
            <div>
              <TextField type="number"
                    value={price}
                    onChange={(e) => handleSubmit(e)}
                    placeholder='SafeMoon Price' 
                    id="price" 
                    label="Set SafeMoon Price" variant="outlined"
              />
            </div>

            <div>
              <TextField type="number"
                    value={volume}
                    onChange={(e) => handleSubmit(e)}
                    placeholder='SafeMoon Volume' 
                    id="volume" 
                    label="Set SafeMoon Volume" variant="outlined"
              />
            </div>
          </form>
        </div>

        <div>
          <div>
            <div className="calcul-results">
                <span>Daily reflections:</span>
                <div className="bold">${reflectionDayDollar ? reflectionDayDollar : "0"}</div>
                <div className="bold">{reflectionDay ? reflectionDay : "0"}SFM</div>
            </div>
            <div className="calcul-results"><span>Daily ROI:</span><div className="bold">{dailyRoi ? dailyRoi : "0"}%</div></div>
            <div className="calcul-results"><span>APY:</span><div className="bold">{yearRoi ? Math.round(yearRoi) : "0"}%</div></div>
            <div className="calcul-results"><span>Account balance:</span><div className="bold">{quantity && price ? quantity*price : "0"}$</div></div>
            <div>
              <span className="crypto-caption">{Math.round(yearRoi) > 30 ? 'APY is > 30 % Increase the price for more realistic results!' : ''}</span>
              <span className="crypto-caption">{Math.round(yearRoi) < 2 ? 'APY is < 2 % Try to lower the price for more realistic results!' : ''}</span>      
            </div>
          </div>
        </div>
      </div>
      <h2 className="crypto-caption">Big thanks to <a href="https://www.reddit.com/r/SafeMoon/comments/nl1sgo/tokenomics_and_mathemagics/" target="_blank">Material_Rich9906</a> on reddit for the maths!</h2>
    </div>
  );
}

export default Calcul;