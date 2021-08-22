import React from "react";
import {Link} from "react-router-dom";
import "./Main.css";
import "./news/News.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SafemoonStats from "./safemoonStats/SafemoonStats";
import Whales from "./whales/Whales";
import CompareCoins from "./compareCoins/CompareCoins";
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded';
import {useStateValue} from "../StateProvider";

const useStyles = makeStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'scroll',
  },
  link: {
    textDecoration: 'none',
    textDecoration: 'none',
    background: '#fff',
    margin: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '.5rem',
    padding: '1rem 2rem',
    boxShadow: '0 6px 10px 0 rgb(31 38 135 / 37%)',
    transition: 'transform .2s,box-shadow .2s',
  },
});

const iconStyle = (fontsize) => {
  return {
    fill: "transparent",
    stroke: "#1a1a2c",
    strokeWidth: 0.25,
    fontSize: fontsize,
  };
};

function Main() {
  const classes = useStyles();

  return (
    <div className="main">
      <div className='coin-app'>
        <h1 className='coin-text'>Your crypto corner</h1>
        <div className="makeStyles-container-2 {classes.container}">
          <Link className={classes.link} to="/market">
            <Card className={classes.root}>
                <TrendingUpRoundedIcon
                  className="sidebar__menuIcon"
                  style={iconStyle(125)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Crypto market overview
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Pulls the top 200 cryptocurrencies market info ranked by value using Coingecko API. Search the crypto you want to see and check the charts
                  </Typography>
                </CardContent>
            </Card>
          </Link>
          <Link className={classes.link} to="/news">
            <Card className={classes.root}>
                <ChromeReaderModeRoundedIcon
                  className="sidebar__menuIcon"
                  style={iconStyle(125)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Crypto news
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Using Gnews API to show the last news regarding SafeMoon.
                  </Typography>
                </CardContent>
            </Card>
          </Link>
          <Link className={classes.link} to="/calculator">
            <Card className={classes.root}>
                <FunctionsRoundedIcon
                  className="sidebar__menuIcon"
                  style={iconStyle(125)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Safemoon Calculator
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Get calculations of your reflections by inputing your holdings and some assumptions on the daily volume.
                  </Typography>
                </CardContent>
            </Card>
          </Link>
          <Link className={classes.link} to="/subs">
            <Card className={classes.root}>
                <ForumRoundedIcon
                  className="sidebar__menuIcon"
                  style={iconStyle(125)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Subreddits overview
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Pulls conversations from three communities (Bitcoin, Safemoon and Ethereum) and shows the brief articles. If they are clicked, it shows all the content plus the comment sections
                  </Typography>
                </CardContent>
            </Card>
          </Link>
        </div>
        <div className="safemoon-dashboard">
          <SafemoonStats/>
          <Whales />
        </div>
        <CompareCoins />
      </div>
    </div>
  );
}
export default Main;
