import React, {useEffect, useRef, useState} from "react";
import "./Store.css";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import {errorAnim} from "../../util";
import db from "../../firebase";

function AddInfosStore() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  const [{ user, loadingBar }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const storeForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(storeForm.current);
    setLoading(true);
    db.collection("users")
      .doc(user.uid)
      .collection("store")
      .set({
        name: formData.get("name"),
        owner: user.displayName,
        ownerId: user.uid,
        address: formData.get("address"),
        description: formData.get("description"),
      }, { merge: true }
      )
      .then(() => {
        setLoading(false);
        storeForm.current.reset();
      });
  };

  return (
              <form className="form cart__checkout" ref={storeForm}>
                <div className="form__element">
                  <input id="name" name="name" type="text" required />
                  <label for="name">Store Name</label>
                </div>

                <div className="form__element">
                  <input id="address" name="address" type="text" required />
                  <label for="address">Address</label>
                </div>
                
                <h5 style={{ margin: "2rem 0 1rem 0" }}>Description</h5>
                <div className="form__element">
                  <input id="description" name="description" type="text" required />
                  <label for="description">Description: what are you selling ?</label>
                </div>
                <div style={{ marginTop: "2rem" }} className="form__element buttons">
                  <button
                    disabled={loading}
                    className="button buttonPrimary submit"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            
  );
}

export default AddInfosStore;
