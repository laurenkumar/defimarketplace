import React, {useRef, useState} from "react";
import "./Header.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import "./SearchResults.css";
import {useHistory, useLocation} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import Modal from 'react-modal';
import {Web3ReactProvider} from "@web3-react/core";
import {ethers} from "ethers";
import {WalletConnectorsComponent} from "../wallet/walletConnectorsComponent"

function Header() {
    const location = useLocation();
    const history = useHistory();
    const queryRef = useRef(null);
    const [results, setResults] = useState(null);
    const [resultsOpen, setResultsOpen] = useState(false);
    const [{fuse}] = useStateValue();
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const chainId = [56];

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

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getLibrary(provider) {
        const library = new ethers.providers.Web3Provider(provider);
        library.pollingInterval = 12000;
        return library;
    }


    const handleChange = (e) => {
        if (queryRef.current.value.length > 0) {
            setResults(fuse.search(queryRef.current.value));
            setResultsOpen(true);
        } else {
            setResults(null);
            setResultsOpen(false);
        }
    };

    return (
        <div className="header">

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Web3ReactProvider getLibrary={getLibrary}>
                    <WalletConnectorsComponent/>
                </Web3ReactProvider>
            </Modal>
            <div className="header__nav">
                {location.pathname !== "/" && (
                    <button onClick={() => history.goBack()} className="header__back">
                        Back
                    </button>
                )}
                <div className="header__search">
                    <SearchRoundedIcon className="header__searchIcon"/>
                    <input
                        type="text"
                        ref={queryRef}
                        onChange={handleChange}
                        placeholder="Search..."
                    />
                </div>
                {resultsOpen && (
                    <motion.div
                        className="results noScrollbar"
                        initial={{opacity: 0, y: "-1rem"}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: "-1rem"}}
                    >
                        {results.map((result) => (
                            <div
                                onClick={() => {
                                    setResultsOpen(false);
                                    queryRef.current.value = "";
                                    history.push(`/product/${result.item.id}`, {
                                        product: result.item,
                                    });
                                }}
                                className="result"
                            >
                                <div className="result__image">
                                    <img src={result.item.imgUrl}/>
                                </div>
                                <span>
                  <p className="result__title">{result.item.name}</p>
                  <small className="result__desc">
                    {result.item.feature[0]}
                  </small>
                </span>
                            </div>
                        ))}
                    </motion.div>
                )}

                <div className="buttons">
                    <button className="buttonSecondary" onClick={openModal}>Connect</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
