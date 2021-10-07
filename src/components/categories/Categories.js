import React from "react";
import "./Categories.css";
import {useStateValue} from "../../StateProvider";

const categories = [
  "electronics",
  "jewellery",
  "wood & epoxy",
  "men's clothing",
  "women's clothing",
  "appliances",
  "toys",
  "movies & TV",
  "music",
  "software",
];

function Categories() {
  const [{ user }, dispatch] = useStateValue();

  const setActive = (e, category) => {
    let prevActive = document.querySelector(".categories__category.active");
    if (prevActive) prevActive.classList.remove("active");
    e.preventDefault();
    e.target.classList.add("active");
    dispatch({
      type: "SET_CATEGORY",
      category: category,
    });
  };

  return (
    <div className="categories">
      <a href="" title="All Departments"><span
        className="categories__category active"
        onClick={(e) => setActive(e, "all")}
      >
        All Departments
      </span></a>
      {categories.map((category) => (
        <a href="" title={category}>
        <span
          className="categories__category"
          onClick={(e) => setActive(e, category)}
        >
          {category}
        </span>
        </a>
      ))}
    </div>
  );
}
export default Categories;
