import React from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import ReactTooltip from "react-tooltip";
import {useStateValue} from "../../StateProvider";
import {getCartTotal, getTotalItems} from "../../reducer";
import {Link} from "react-router-dom";
import emptyCart from "../../assets/emptyCart.svg";

function Cart() {
  const [{ user, cart }] = useStateValue();

  return (
    <div className="cart">
      <h4>Your Cart</h4>
      {cart.length > 0 ? (
        <div className="cart__inner">
          <div className="cart__items">
            <ReactTooltip
              id="removeTooltip"
              place="right"
              className="app__toolTip app__toolTipRed"
              backgroundColor="#dc143cee"
              effect="solid"
            />
            {cart.map((item) => (
              <CartItem item={item} />
            ))}
          </div>
          <div className="cart__checkout">
            <h5>Checkout</h5>
            <p className="cart__total">Sub-Total: ${getCartTotal(cart)}</p>
            <p>Number of items: {getTotalItems(cart)}</p>
            <p style={{ opacity: 0.5 }}>
              This price is exclusive of taxes. GST will be added during
              checkout.
            </p>
            <div className="buttons">
              <Link to={user ? "/payment" : "/signup?next=payment"}>
                <button className="buttonPrimary">Proceed to Payment</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "1rem" }} className="cart__inner">
          <div className="cart__items">
            <img src={emptyCart} className="cart__empty" />
          </div>
          <div className="cart__checkout">
            <h4>Your cart feels lonely.</h4>
            <p style={{ marginBottom: "3rem" }}>
              Your shopping cart lives to serve. Give it purpose - fill it with
              books, electronicts, videos, etc. and make it happy.
            </p>
            <div className="buttons">
              <Link to="/">
                <button className="buttonPrimary">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
