import React, { useEffect, Fragment } from "react";
import "./feedNews.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getNewsData } from "../../redux/actions/NewsData";
import { v4 as uuidv4 } from "uuid";
import LoaderIcon from "../loaderIcon/LoaderIcon";

const FeedNews = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.NewsData);

  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);

  const ShowData = () => {
    if (!_.isEmpty(news.data.articles)) {
      return news.data.articles.map((el) => {
        return (
          <Fragment>
            <a href={el.url} className="link-news" title={el.title} target="_blank" rel="noopener noreferrer">
              <article className="show-posts-container" key={uuidv4()}>
                <div className="posts-img-container">
                  <img src={el.image} alt={el.title} className="posts-img" />
                </div>
                <div className="details-container">
                  <h2><span>{el.title}</span></h2>
                  <div className="post-selftext">
                    <p>{el.content}</p>
                  </div>
                </div>
              </article>
              <span className="ac-link">Opens in a new window</span>
            </a>
          </Fragment>
        );
      });
    }

    if (news.loading) {
      return <LoaderIcon />;
    }

    if (news.errorMsg !== "") {
      return <p>{news.errorMsg}</p>;
    }

    return (
      <div className="empty-data-container">
        <p>No Data</p>
      </div>
    );
  };

  return (
    <main className='coin-app'>
      <h1 className='coin-text'>Last News About SafeMoon</h1>
      <section className='news-container'>
        <ShowData />
      </section>
    </main>
  );
};

export default FeedNews;
