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
import AddInfosStore from "./addInfosStore";
import { Link, useHistory } from "react-router-dom";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

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
  const [showForm, setShowForm] = useState(false);

  const onClick = () => setShowForm(true);

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
            setProductOwned(response.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })));
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

  function removeItem(itemId) {
    console.log(itemId);
    db.collection("users")
      .doc(user.uid)
      .collection("products").doc(itemId).delete().then((response) => {
        if (loadingBar) {
          loadingBar.current.complete();
        }
    });
  }

  const editItem = () => {

  }

  const updatePageState = (state) => {
    setShowForm(state);
  } 

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

            {showForm ? <AddProductStore showForm={showForm} triggerParentUpdate={updatePageState}/> :
              <div className="orders__inner">
                <div style={{ marginTop: "2rem" }} className="buttons">
                  <button className="button buttonPrimary" onClick={onClick}>Add a product</button>
                </div>
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
                        <div className="storeProduct__remove">
                          <button
                            onClick={() => removeItem(product.id)}
                            data-for="removeTooltip"
                            data-tip="Delete Product"
                            className="buttonRed"
                          >
                            <DeleteRoundedIcon style={{ fontSize: 16 }} />
                          </button>
                          <button
                            onClick={editItem}
                            data-for="editItem"
                            data-tip="Edit your product"
                            className="buttonSecondary"
                          >
                            <EditRoundedIcon style={{ fontSize: 16 }} />
                          </button>
                        </div>
                    </div>
                    <div style={{ marginTop: "auto" }} className="payment__item">
                      <span className="payment__name">Price</span>
                      <span className="payment__price">
                        <strong style={{ fontSize: "1.25em", fontWeight: "900" }}>
                          <small>{product.price} $</small>
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            }
          </TabPanel>
          <TabPanel>
            <h3 style={{ marginBottom: "1rem" }}>Your Deliveries</h3>
          </TabPanel>
          <TabPanel>
            <h3 style={{ marginBottom: "1rem" }}>General informations about your store</h3>
            <AddInfosStore />      
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Store;
