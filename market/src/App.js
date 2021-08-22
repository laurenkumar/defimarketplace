import React, {useEffect, useRef} from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./components/layout/Button.css";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import CalculPage from "./pages/CalculPage";
import RedditPage from "./pages/RedditPage";
import FeedPage from "./pages/FeedPage";
import RedditPostPage from "./pages/SubsPage";
import {Route, Switch, useLocation} from "react-router-dom";
import {AnimatePresence, AnimateSharedLayout} from "framer-motion";
import "./App.css";
import {useStateValue} from "./StateProvider";
import LoadingBar from "react-top-loading-bar";
import {shuffleArray} from "./util";
import Fuse from "fuse.js";
import axios from "axios";

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
    if (loadingBar) {
      dispatch({
        type: "LOADING_BAR",
        loadingBar: loadingBar,
      });
    }
  }, [loadingBar]);

  return (
    <div className="app">
      <LoadingBar height={3} color="#78cac8" ref={loadingBar} shadow={true} />
      <Sidebar />
      <div className="app__inner">
        <AnimatePresence exitBeforeEnter>
          <AnimateSharedLayout>
              <Header />
            <Switch location={location} key={location.pathname}>
              <Route path="/news">
                <FeedPage />
              </Route>
              <Route path="/subs">
                <RedditPostPage />
              </Route>
              <Route path="/calculator">
                <CalculPage />
              </Route>
              <Route path="/market">
                <NewsPage />
              </Route>
              <Route
                path="/reddit/post/:subreddit/:id"
                component={RedditPage}
              />
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
