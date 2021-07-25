import React, {useEffect, useRef, useState} from "react";
import "../cart/Cart.css";
import "./Store.css";
import CartItem from "../cart/CartItem";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useStateValue } from "../../StateProvider";
import { motion } from "framer-motion";
import { useQuery, errorAnim } from "../../util";
import db, {auth} from "../../firebase";
import AddProductStore from "./addProductStore";
import { Link, useHistory } from "react-router-dom";

function Store() {
  const [checked, setChecked] = useState(false);
  const query = useQuery();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [productOwned, setProductOwned] = useState();
  const [{ user, loadingBar }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [{ cart }] = useStateValue();
  const productForm = useRef(null);

  constructor() {
    super();
    this.state = {
      showHideFName: false,
      showHideLName: true
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    switch (name) {
      case "showHideFName":
        this.setState({ showHideFName: !this.state.showHideFName });
        break;
      case "showHideLName":
        this.setState({ showHideLName: !this.state.showHideLName });
        break;
      default:
        null;
    }
  }

  useEffect(() => {
    if (loadingBar) {
      loadingBar.current.continuousStart();
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .collection("products").get().then((response) => {
            if (loadingBar) {
              loadingBar.current.complete();
            }
            console.log(response.docs.map((doc) => doc.data()));
            setProductOwned(response.docs.map((doc) => doc.data()));
        });
        unsubscribe();
      } else {
        history.replace("/login?next=orders");
        if (loadingBar) {
          loadingBar.current.complete();
        }
      }
    });
  }, []);

  return (
    <div className="store cart">
      <h2>Hey, welcome to your store</h2>
      <p style={{ maxWidth: "480px", marginBottom: "2rem", opacity: 0.5 }}>
        This is your Dashboard. Add, Edit and Manage your products. Monitor
        Orders, Deliveries, and much more.
      </p>
      <div className="cart__inner">
        <Tabs>
          <TabList>
            <Tab>Recent Orders</Tab>
            <Tab>Products</Tab>
            <Tab>Deliveries</Tab>
            <Tab>Store Information</Tab>
          </TabList>

          <TabPanel>
            <div className="cart__items">
                <h3 style={{ marginBottom: "1rem" }}>Your Orders</h3>
                {cart.map((item) => (
                  <CartItem item={item} />
                ))}
              </div>
          </TabPanel>
          <TabPanel>
            <h3 style={{ marginBottom: "1rem" }}>Your Product(s)</h3>
            {showHideFName && (
              <AddProductStore />
              <button onClick={() => this.hideComponent("showHideFName")}>
                Show Your Products
              </button>
            )}
            {showHideLName && (
              <div className="orders__inner">
                {productOwned?.map((product) => (
                  <div className="payment__summary">
                    <h5>Product Name: {product.name}</h5>
                    <div className="order__list noScrollbar">
                        <div className="order__item">
                          <div className="order__image">
                            <img src={product.imgUrl} />
                          </div>
                          <small className="order__quantity">x{product.stock}</small>
                        </div>
                    </div>
                    <div style={{ marginTop: "auto" }} className="payment__item">
                      <span className="payment__name">Price</span>
                      <span className="payment__price">
                        <strong style={{ fontSize: "1.25em", fontWeight: "900" }}>
                          <small>{product.price}</small>
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button onClick={() => this.hideComponent("showHideLName")}>
                Add a product
            </button>
          </TabPanel>
          <TabPanel>
            <h3 style={{ marginBottom: "1rem" }}>Your Deliveries</h3>
          </TabPanel>
          <TabPanel>
            <h3 style={{ marginBottom: "1rem" }}>General informations about your store</h3>   
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Store;
