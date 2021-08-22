import React, {useRef, useState} from "react";
import "./Header.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./SearchResults.css";
import {useHistory, useLocation} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import Modal from 'react-modal';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const queryRef = useRef(null);
  const [results, setResults] = useState(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [{ fuse }] = useStateValue();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const styleButton = {
    height: "2rem"
  }

  return (
    <div className="header">
        
        
      
    </div>
  );
}
export default Header;
