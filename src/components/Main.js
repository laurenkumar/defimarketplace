import React from "react";
import "./Main.css";
import Product from "./products/Product";
import {useStateValue} from "../StateProvider";

function Main() {
  const [{ products, category }] = useStateValue();
  return (
    <main className="main">
      <div className="products">
        {products?.map((product) =>
          category === "all" ? (
            <Product id={product.id} item={product} />
          ) : category === product.category ? (
            <Product id={product.id} item={product} />
          ) : null
        )}
      </div>
    </main>
  );
}
export default Main;
