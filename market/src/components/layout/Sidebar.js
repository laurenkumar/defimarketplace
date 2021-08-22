import React, {useState} from "react";
import "./Sidebar.css";
import amazonIcon from "../../assets/icon.svg";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import {NavLink, useHistory} from "react-router-dom";
import defaultImage from "../../assets/default.jpg";
import ReactTooltip from "react-tooltip";
import {useStateValue} from "../../StateProvider";

const iconStyle = (fontsize) => {
  return {
    fill: "transparent",
    stroke: "#1a1a2c",
    strokeWidth: 1,
    fontSize: fontsize,
  };
};

function Sidebar() {
  const history = useHistory();
  const [{ user }] = useStateValue();
  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebar = () =>
    setSidebarActive((sidebarActive) => !sidebarActive);

  return (
    <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
      <img src={amazonIcon} className="sidebar__icon" onClick={toggleSidebar} />
      <div className="sidebar__menu">
        <NavLink
          to="/"
          exact
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Home"
          data-for="sidebarTooltip"
          onClick={toggleSidebar}
        >
          <HomeRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(36)}
          />
        </NavLink>
        <NavLink
          to="/market"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Market"
          data-for="sidebarTooltip"
          onClick={toggleSidebar}
        >
          <TrendingUpRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
        </NavLink>
        <NavLink
          to="/news"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="SafeMoon News"
          data-for="sidebarTooltip"
          onClick={toggleSidebar}
        >
          <ChromeReaderModeRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
        </NavLink>
        <NavLink
          to="/calculator"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Calculator"
          data-for="sidebarTooltip"
          onClick={toggleSidebar}
        >
          <FunctionsRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
        </NavLink>
        <NavLink
          to="/subs"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Subreddits"
          data-for="sidebarTooltip"
          onClick={toggleSidebar}
        >
          <ForumRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
        </NavLink>
      </div>
      <ReactTooltip
        place="right"
        className="app__toolTip"
        id="sidebarTooltip"
        backgroundColor="#1a1a2cee"
        effect="solid"
      />
    </div>
  );
}
export default Sidebar;
