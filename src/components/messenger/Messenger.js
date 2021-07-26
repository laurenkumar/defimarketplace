import React from "react";
import "./Messenger.css";
import {useStateValue} from "../../StateProvider";
import chatting from "../../assets/chatting.svg";
import {Link} from "react-router-dom";

function Messenger() {
  const [{ messenger }] = useStateValue();

  return (
    <div className="messenger">
      <h2>Messenger</h2>
      {messenger.length > 0 ? (
        <div className="products">
          /*{bookmarks.map((product) => (
            <Product id={product.id} item={product} />
          ))}*/
        </div>
      ) : (
        <div className="cart__inner messenger__inner">
          <div className="cart__items">
            <img src={chatting} className="cart__empty" />
          </div>
          <div className="cart__checkout">
            <h4>It's empty here.</h4>
            <p style={{ marginBottom: "3rem" }}>
              You have no one to talk to yet ? You should go to the store and see if something catch your eye. Contact a store owner then !
            </p>
            <div className="buttons">
              <Link to="/">
                <button className="buttonPrimary">Go Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Bookmarks;
