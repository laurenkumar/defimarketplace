import React, {useEffect, useRef, useState} from "react";
import "./Store.css";
import {useStateValue} from "../../StateProvider";
import {motion} from "framer-motion";
import {errorAnim} from "../../util";
import {countries, useQuery} from "../../util";
import db from "../../firebase";

function AddInfosStore() {
  const [error, setError] = useState(null);
  const checkbox = useRef(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(false);
  const [store, setStore] = useState(false);
  const [{ user, loadingBar }] = useStateValue();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country && validateNumber(phone) && checked) {
      setStatus(true);
      loadingBar.current.continuousStart();
      updateStore();
      setStatus(false);
    } else {
      alert("Please check your details again!");
    }
  };

  const validateNumber = (value) => {
    const re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(value);
  };
 
  const storeInfos = db.collection("users")
      .doc(user.uid)
      .collection("store").get().then((response) => {
        if (loadingBar) {
          loadingBar.current.complete();
        }
        setStore(response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })));
        console.log(store)
        return store;
  });

  const updateStore = async () => {
    if (storeInfos != "null") {
      setLoading(true);
      db.collection("users")
        .doc(user.uid)
        .collection("store")
        .doc()
        .set({
          name: name,
          owner: user.displayName,
          ownerId: user.uid,
          walletAddress: walletAddress,
          email: user.email,
          phone: phone,
          description: description,
          address: address,
          state: stateName,
          country: country,
          postal_code: zipcode,
        }, { merge: true }
        )
        .then(() => {
          setLoading(false);
          loadingBar.current.complete();
      });
    } else {
      console.log("yous should")
    }
    
  };

  return (
        <form className="form__split" onSubmit={(e) => handleSubmit(e)}>
          <div className="form">
            <h5>Delivery Address</h5>
            <div className="form__element">
              <input
                className={address ? "active " : ""}
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label for="address">Address</label>
            </div>
            <div className="form__element">
              <input
                className={stateName ? "active " : ""}
                id="state"
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
              />
              <label for="state">State</label>
            </div>
            <div className="form__element">
              <select
                className={country ? "active " : ""}
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option default selected value=""></option>
                {countries.map((item) => (
                  <option value={item.abbreviation}>{item.country}</option>
                ))}
              </select>
              <label for="country">Country</label>
            </div>
            <div className="form__element">
              <input
                className={zipcode ? "active " : ""}
                id="zip"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
              <label for="zip">ZIP Code</label>
            </div>
          </div>
          <div className="form">
            <h5>Personal Details</h5>
            <div className="form__element">
              <input id="name" name="name" type="text" className={name ? "active " : ""}
                value={name}
                onChange={(e) => setName(e.target.value)}/>
              <label for="name">Store Name</label>
            </div>
            <div className="form__element">
              <input
                className={phone ? "active " : ""}
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label for="phone">Mobile Number</label>
            </div>
            <div className="form__element">
              <input
                className={walletAddress ? "active " : ""}
                id="walletAddress"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <label for="walletAddress">Wallet Address</label>
            </div>
            <div className="form__element">
              <input id="description" name="description" type="text" className={description ? "active " : ""}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
              <label for="description">Description: what are you selling ?</label>
            </div>
            <div className="form__element">
              <input
                id="terms"
                type="checkbox"
                ref={checkbox}
                checked={checked}
                required
              />
              <label
                onClick={() => setChecked((checked) => !checked)}
                for="terms"
              >
                Accept Terms & Conditions
              </label>
            </div>
            <div className="form__element buttons">
              <button
                disabled={!checked || loading}
                style={{ margin: "none" }}
                className="button buttonPrimary submit"
                type="submit"
              >
                {status ? "Updating..." : "Update Infos"}
              </button>
            </div>
          </div>
        </form>
            
  );
}

export default AddInfosStore;
