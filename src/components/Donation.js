import React from "react";
import "./Donation.css";
import ReactTooltip from "react-tooltip";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { errorAnim } from "../util";
import crypto from '../assets/cryptocurrency-certificate.png';
import bitcoin from '../assets/bitcoin.png';
import ether from '../assets/ether.png';
import doge from '../assets/doge.png';
import ltc from '../assets/ltc.png';
import bnb from '../assets/bnb.png';
import iota from '../assets/iota.png';
import cardano from '../assets/cardano.png';
import vechain from '../assets/vechain.png';
import xrp from '../assets/xrp.png';
import safemoon from '../assets/safemoon.png';

function Donation() {
  return (
    <div className="donation">
       	<div className="wrapper">
		  	<div className="main-container">
			    <div className="content-wrapper">
				    <div className="content-wrapper-header">
				     	<div className="content-wrapper-context">
				      		<h1 className="img-content" style={{color: "white"}}>
				       			Donation Page
				      		</h1>
				      		<div className="content-text">
				      			<h2 style={{color: "white"}}>Any donations provided will go toward the following:</h2>
							</div>
				     	</div>
				     	<div className="content-text">
								<ul>
									<li>Keep the platform up and running without ads</li>
									<li>Adding of more features</li>
									<li>Pay the hosting cost and any fees in relation to the platform</li>
									<li>Expand the team to improve the platform and add features faster</li>
								</ul>
						</div>
				     	<img className="content-wrapper-img" src={crypto} alt="crypto decorative image"/>
				    </div>
				    <div className="content-section">
				    	<div className="content-section-title">Copy sending address of the currency you wish to donate
						</div>
				     	<ul>

				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<img className="content-wrapper-img safemoon" src={safemoon} alt="Safemoon decorative image"/>
					        		SafeMoon
				       			</div>
						      
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		
				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={bitcoin} alt="bitcoin decorative image"/>
				        			Bitcoin
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>

				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<img className="content-wrapper-img" src={ether} alt="ether decorative image"/>
					        		Ethereum
				       			</div>
						      
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		
				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={ltc} alt="litecoin decorative image"/>
				        			LTC
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>

				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<img className="content-wrapper-img" src={bnb} alt="bnb decorative image"/>
					        		BNB
				       			</div>
						      
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		
				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={cardano} alt="cardano decorative image"/>
				        			ADA
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>

				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<img className="content-wrapper-img" src={doge} alt="doge decorative image"/>
					        		Doge
				       			</div>
						      
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		
				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={xrp} alt="xrp decorative image"/>
				        			XRP
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>

				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={vechain} alt="vechain decorative image"/>
				        			Vechain
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		<li className="adobe-product">
				       			<div className="products">
				        			<img className="content-wrapper-img" src={iota} alt="iota decorative image"/>
				        			IOTA
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				     	</ul>
				    </div>
				    <h2>Or via Paypal</h2>
				    <div className="buttons" style={{ marginLeft: "1rem" }}>
          				<button className="buttonPrimary">SafemoonMarket</button>
          			</div>
				</div>
			</div>
		</div>
		<div className="overlay-app"></div>
    </div>
  );
}

export default Donation;
