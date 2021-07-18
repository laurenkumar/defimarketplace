import React, { useState, useRef, useEffect } from "react";
import "./Cart.css";
import "./Store.css";
import CartItem from "./CartItem";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useStateValue } from "../StateProvider";
import { motion } from "framer-motion";
import { useQuery, errorAnim } from "../util";
import db, {auth} from "../firebase";
import { Link, useHistory } from "react-router-dom";

function Store() {
  const [checked, setChecked] = useState(false);
  const query = useQuery();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null); 
  const [productOwned, setProductOwned] = useState(); 
  const [{ user, loadingBar }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [{ loadingBar }] = useStateValue();
  const history = useHistory();
  const [{ cart }] = useStateValue();
  const productForm = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(productForm.current);
    setLoading(true);
    const featureArray = [];
    formData.get("feat1") && featureArray.push(formData.get("feat1"));
    formData.get("feat2") && featureArray.push(formData.get("feat2"));
    formData.get("feat3") && featureArray.push(formData.get("feat3"));
    formData.get("feat4") && featureArray.push(formData.get("feat4"));
    db.collection("users")
      .doc(user.uid)
      .collection("products")
      .add({
        name: formData.get("name"),
        owner: user.displayName,
        ownerId: user.uid,
        price: parseFloat(formData.get("price")),
        rating: parseFloat(formData.get("rating")),
        category: formData.get("category"),
        discount: formData.get("offer") === "true",
        originalPrice: parseFloat(formData.get("originalPrice")),
        imgUrl: formData.get("url"),
        feature: featureArray,
      })
      .then(() => {
        setLoading(false);
        productForm.current.reset();
      });
  };

  useEffect(() => {
    if (loadingBar) {
      loadingBar.current.continuousStart();
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .collection("products").orderBy("created", "desc").get().then((response) => {
            if (loadingBar) {
              loadingBar.current.complete();
            }
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
            <form className="form cart__checkout" ref={productForm}>
                <h3 style={{ marginBottom: "1rem" }}>Add New Product</h3>
                <div className="form__element">
                  <input id="name" name="name" type="text" required />
                  <label for="name">Product Name</label>
                </div>
                <div className="form__element">
                  <input id="category" name="category" type="text" required />
                  <label for="category">Product Category</label>
                </div>
                <div className="form__element">
                  <input id="rating" name="rating" type="text" required />
                  <label for="rating">Rating</label>
                </div>
                <div className="form__element">
                  <input id="url" name="url" type="text" required />
                  <label for="url">Image URL</label>
                </div>
                <div className="form__element">
                  <input id="price" name="price" type="text" required />
                  <label for="price">Price</label>
                </div>
                <div className="form__element">
                  <input
                    id="offer"
                    name="offer"
                    type="checkbox"
                    value={checked}
                    checked={checked}
                  />
                  <label
                    for="offer"
                    onClick={() => setChecked((checked) => !checked)}
                  >
                    In Offer
                  </label>
                </div>
                {checked && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={errorAnim}
                    className="form__element"
                  >
                    <input
                      id="originalPrice"
                      name="originalPrice"
                      type="text"
                      required={checked}
                    />
                    <label for="originalPrice">Original Price</label>
                  </motion.div>
                )}
                <h5 style={{ margin: "2rem 0 1rem 0" }}>Features</h5>
                <div className="form__element">
                  <input id="feat1" name="feat1" type="text" required />
                  <label for="feat1">Feature 1</label>
                </div>
                <div className="form__element">
                  <input id="feat2" name="feat2" type="text" required />
                  <label for="feat2">Feature 2</label>
                </div>
                <div className="form__element">
                  <input id="feat3" name="feat3" type="text" required />
                  <label for="feat3">Feature 3</label>
                </div>
                <div className="form__element">
                  <input id="feat4" name="feat4" type="text" required />
                  <label for="feat4">Feature 4</label>
                </div>
                <div style={{ marginTop: "2rem" }} className="form__element buttons">
                  <button
                    disabled={loading}
                    className="button buttonPrimary submit"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </form>
            <div className="orders__inner">
              {productOwned?.map((product) => (
                <div className="payment__summary">
                  <h5>Product ID: {order.created}</h5>
                  <div className="order__list noScrollbar">
                    {product.items.map((item) => (
                      <div className="order__item">
                        <div className="order__image">
                          <img src={item.imgUrl} />
                        </div>
                        <span className="order__name">{item.name}</span>
                        <small className="order__quantity">x{item.quantity}</small>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "auto" }} className="payment__item">
                    <span className="payment__name">Amount</span>
                    <span className="payment__price">
                      <strong style={{ fontSize: "1.25em", fontWeight: "900" }}>
                        <small>$</small>
                      </strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
