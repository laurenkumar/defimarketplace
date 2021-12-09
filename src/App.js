import React, {useEffect, useRef} from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./components/layout/Button.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import MessengerPage from "./pages/MessengerPage";
import CartPage from "./pages/CartPage";
import DonationPage from "./pages/DonationPage";
import NewsPage from "./pages/NewsPage";
import BookmarkPage from "./pages/BookmarkPage";
import UserPage from "./pages/UserPage";
import {Route, Switch, useLocation} from "react-router-dom";
import {AnimatePresence, AnimateSharedLayout} from "framer-motion";
import "./App.css";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import LoadingBar from "react-top-loading-bar";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {shuffleArray} from "./util";
import Fuse from "fuse.js";
import axios from "axios";

const promise = loadStripe(
  "pk_test_51HdsPRE4K4vYNE8J6n2SZ7Q68Z8mqdHJROiHxnm7U5yeTk8oBed7LF3IqSZGSlr1vso40SYgMc3NWeYCvuhKfv6H00pu5ZkJi3"
);
const elFonts = [
  {
    cssSrc:
      "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@800&display=swap",
  },
];

function App() {
  const location = useLocation();
  const [{ user, cart }, dispatch] = useStateValue();
  const loadingBar = useRef(null);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const localBookmarks = localStorage.getItem("bookmarks");
    if (localCart) {
      dispatch({
        type: "RESTORE_CART",
        cart: JSON.parse(localCart),
      });
    }
    if (localBookmarks) {
      dispatch({
        type: "RESTORE_BOOKMARKS",
        bookmarks: JSON.parse(localBookmarks),
      });
    }
  }, []);

  useEffect(() => {
    if (loadingBar) {
      dispatch({
        type: "LOADING_BAR",
        loadingBar: loadingBar,
      });
    }
  }, [loadingBar]);

  useEffect(() => {
    loadingBar.current.continuousStart();
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    axios
      .get("/api/products")
      .then((snapshot) => {
        dispatch({
          type: "SET_PRODUCTS",
          products: shuffleArray(snapshot.data),
        });
        const fuse = new Fuse(snapshot.data, { keys: ["name", "category"] });
        dispatch({
          type: "SET_FUSE",
          fuse: fuse,
        });
      })
      .then(() => {
        loadingBar.current.complete();
      });
  }, [dispatch]);

  return (
    <div className="app">
      <LoadingBar height={3} color="#57609c" ref={loadingBar} shadow={true} />
      <Sidebar />
      <div className="app__inner">
        <AnimatePresence exitBeforeEnter>
          <AnimateSharedLayout>
              <Header />
            <Switch location={location} key={location.pathname}>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/bookmarks">
                <BookmarkPage />
              </Route>
              <Route path="/messenger">
                <MessengerPage />
              </Route>
              <Route path="/login">
                <UserPage type="login" />
              </Route>
              <Route path="/signup">
                <UserPage type="signup" />
              </Route>
              <Route path="/welcome">
                <UserPage type="welcome" />
              </Route>
              <Route path="/store">
                <UserPage type="store" />
              </Route>
              <Route path="/password-reset">
                <UserPage type="passwordReset" />
              </Route>
              <Route path="/profile">
                <UserPage type="profile" />
              </Route>
              <Route path="/auth">
                <Auth />
              </Route>
              <Route path="/admin">
                <AdminPage />
              </Route>
              <Route path="/donation">
                <DonationPage />
              </Route>
              <Route path="/market">
                <NewsPage />
              </Route>
              <Route path="/payment">
                <Elements options={{ fonts: elFonts }} stripe={promise}>
                  <PaymentPage />
                </Elements>
              </Route>
              <Route path="/orders">
                <OrdersPage />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </AnimateSharedLayout>
        </AnimatePresence>
      </div>
      <div
        className="app__spacing"
        style={{ marginTop: "auto", marginBottom: "5rem" }}
      ></div>
      <Footer />
    </div>
  );
}

export default App;
