import React, {useEffect, useRef, useState} from "react";
import "./Store.css";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import {errorAnim} from "../../util";
import db from "../../firebase";

function AddProductStore() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const [{ user, loadingBar }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const productForm = useRef(null);
  const [showForm, setShowForm] = useState(false);

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
        stock: parseFloat(formData.get("stock")),
        category: formData.get("category"),
        discount: formData.get("offer") === "true",
        originalPrice: parseFloat(formData.get("originalPrice")),
        imgUrl: formData.get("url"),
        feature: featureArray,
      })
      .then(() => {
        setLoading(false);
        setShowForm(false);
        productForm.current.reset();
      });
  };

  return (
              <form className="form cart__checkout" ref={productForm}>
                <div className="form__element">
                  <input id="name" name="name" type="text" required />
                  <label for="name">Product Name</label>
                </div>
                <div className="form__element">
                  <input id="category" name="category" type="text" required />
                  <label for="category">Product Category</label>
                </div>
                <div className="form__element">
                  <input id="stock" name="stock" type="text" required />
                  <label for="stock">Stock - How much you got ?</label>
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
                <h5 style={{ margin: "2rem 0 1rem 0" }}>Description</h5>
                <div className="form__element">
                  <input id="feat1" name="feat1" type="text" required />
                  <label for="feat1">Short Description 1</label>
                </div>
                <div className="form__element">
                  <input id="feat2" name="feat2" type="text" required />
                  <label for="feat2">Short Description 2</label>
                </div>
                <div className="form__element">
                  <input id="feat3" name="feat3" type="text" required />
                  <label for="feat3">Short Description 3</label>
                </div>
                <div className="form__element">
                  <input id="feat4" name="feat4" type="text" required />
                  <label for="feat4">Short Description 4</label>
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
            
  );
}

export default AddProductStore;
