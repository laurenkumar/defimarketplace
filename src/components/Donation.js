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

function Donation() {
  return (
    <div className="donation">
       	<div className="wrapper">
		  	<div className="main-container">
			    <div className="content-wrapper">
				    <div className="content-wrapper-header">
				     	<div className="content-wrapper-context">
				      		<h1 className="img-content" style={{color: white}}>
				       			Donation Page
				      		</h1>
				      		<div className="content-text">
				      			<h2>Any donations provided will go toward the following:</h2>
								<ul>
									<li>Keep the platform and running without ads</li>
									<li>Adding of more features</li>
									<li>Pay the hosting cost and any fees in relation to the platform</li>
									<li>Expand the team to improve the platform and add features faster</li>
								</ul>
							</div>
				     	</div>
				     	<img className="content-wrapper-img" src={crypto} alt="crypto decorative image"/>
				    </div>
				    <div className="content-section">
				    	<div className="content-section-title">Copy sending address of the currency you wish to donate
						</div>
				     	<ul>
				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<svg viewBox="0 0 52 52" style={{border:'1px solid #3291b8'}}>
								        <g xmlns="http://www.w3.org/2000/svg">
								          	<path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#061e26" data-original="#393687" />
								          	<path d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z" fill="#c1dbe6" data-original="#89d3ff" />
								        </g>
					        		</svg>
					        		Photoshop
				       			</div>
						      
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>
				      		
				      		<li className="adobe-product">
				       			<div className="products">
				        			<svg viewBox="0 0 52 52" style={{border: '1px solid #C75DEB'}}>
							         <g xmlns="http://www.w3.org/2000/svg">
							          <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#3a3375" data-original="#3a3375" />
							          <path d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z" fill="#e4d1eb" data-original="#e7adfb" />
							         </g>
				        			</svg>
				        			After Effects
				       			</div>
				       			
				       			<div className="button-wrapper">
				        			<button className="content-button status-button open">Open</button>
				       			</div>
				      		</li>

				      		<li className="adobe-product">
				       			<div className="products">
					       		 	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 173.11 173.11"><defs><linearGradient id="linear-gradient" x1="86.56" y1="115.04" x2="86.56" y2="102.06" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b5e0da"/><stop offset="0.63" stop-color="#3cbab2"/><stop offset="0.97" stop-color="#00a89e"/><stop offset="1" stop-color="#00a69c"/></linearGradient><linearGradient id="linear-gradient-2" x1="144.02" y1="117.09" x2="144.02" y2="100.97" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-3" x1="86.56" y1="173.11" x2="86.56" y2="0" xlink:href="#linear-gradient"/></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="81.39 102.06 82.5 107.52 84.55 104.79 86.56 115.04 88.56 104.79 90.61 107.52 91.72 102.06 81.39 102.06"/><path class="cls-2" d="M92,93.38V78c0-3-5.4-10.59-5.4-10.59S81.15,75,81.15,78V93.38a17.58,17.58,0,0,0-8.81,6.41h28.43A17.58,17.58,0,0,0,92,93.38Z"/><path class="cls-3" d="M152.08,109a8.06,8.06,0,1,0-8.06,8.06A8.07,8.07,0,0,0,152.08,109Zm-12.78,0a4.72,4.72,0,1,1,4.72,4.71A4.73,4.73,0,0,1,139.3,109Z"/><path class="cls-4" d="M86.56,0A86.66,86.66,0,0,0,0,86.55c0,33,20.27,59.54,47.16,61.77,16.36,1.35,32.18-4.48,42.6-9.62a65.32,65.32,0,0,0,17.16-10.39l1.12-.93h0c.84-.73,1.62-1.43,2.37-2.14,9.76-9.25,21.39-25.89,21.39-52.66V69.63L86.93,38.85,42.05,69.63v2.94c0,26.77,11.63,43.41,21.39,52.66,1.14,1.08,2.34,2.14,3.58,3.16,4.1-1.48,8.18-3,12.17-4.77C69,117,54.23,102.69,53.25,75.47L86.93,52.36,120.6,75.47c-.79,22-10.69,35.51-19.35,43.14l-1.08.83c-.26.2-26.25,19.92-52.09,17.77-16.15-1.34-29.25-14.47-34.47-32.76A9.21,9.21,0,0,0,11.18,88.2c0-.55,0-1.09,0-1.65a74.83,74.83,0,0,1,6.58-30.74,22.19,22.19,0,0,0,8.32,1.64A21.89,21.89,0,0,0,45.36,25.28c-.25-.46-.52-.89-.79-1.33a75.3,75.3,0,0,1,105.35,21.8,15.69,15.69,0,0,0,10.14,27.67c.24,0,.49,0,.73,0A75.27,75.27,0,0,1,162,86.55c0,39.1-31.11,70-75.6,75.43C50.82,166.35,28,151.58,28,151.58c13.31,14.69,31.92,21.53,58.57,21.53A86.56,86.56,0,0,0,86.56,0ZM14,98.2a5.79,5.79,0,0,1-1.33,2.62A66.54,66.54,0,0,1,11.36,92,5.85,5.85,0,0,1,14,98.2Zm28.4-71.35A18.54,18.54,0,0,1,19.16,52.78,75.92,75.92,0,0,1,41.83,25.89C42,26.2,42.23,26.52,42.41,26.85ZM160.06,70.08a12.35,12.35,0,0,1-8.36-21.45,75.2,75.2,0,0,1,8.43,21.44Z"/></g></g></svg>
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
				    <button>SafemoonMarket</button>
				</div>
			</div>
		</div>
		<div className="overlay-app"></div>
    </div>
  );
}

export default Donation;
