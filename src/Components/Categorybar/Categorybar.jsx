import React, { useState } from "react";
import style from "./Categorybar.module.css";
import Food from "../../assets/Food.jpg";
import Health from "../../assets/Health.jpg";
import Movies from "../../assets/Movies.jpg";
import Education from "../../assets/Education.jpg";
import Travel from "../../assets/Travel.jpg";
import All from "../../assets/All.jpg";
import AllContext from "../../Context/Context";
import { useContext } from "react";
function Categorybar() {
  const { active, setactive } = useContext(AllContext);
  const handleCategoryClick = (category) => {
    setactive(category);
  };


  return (
    <div className={style.Categorybar}>
      <div
        className={`${style.categorycontainer} ${
          active === "All" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("All")}
      >
        <h2 className={style.heading}>All</h2>
        <img src={All} alt="all" />
      </div>

      <div
        className={`${style.categorycontainer} ${
          active === "Food" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("Food")}
      >
        <h2 className={style.heading}>Food</h2>
        <img src={Food} alt="all" />
      </div>

      <div
        className={`${style.categorycontainer} ${
          active === "Health & Fitness" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("Health & Fitness")}
      >
        <h2 className={style.heading}>Health</h2>
        <img src={Health} alt="all" />
      </div>

      <div
        className={`${style.categorycontainer} ${
          active === "Movies" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("Movies")}
      >
        <h2 className={style.heading}>Movies</h2>
        <img src={Movies} alt="all" />
      </div>

      <div
        className={`${style.categorycontainer} ${
          active === "Education" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("Education")}
      >
        <h2 className={style.heading}>Education</h2>
        <img src={Education} alt="all" />
      </div>

      <div
        className={`${style.categorycontainer} ${
          active === "Travel" ? style.active : ""
        }`}
        onClick={() => handleCategoryClick("Travel")}
      >
        <h2 className={style.heading}>Travel</h2>
        <img src={Travel} alt="all" />
      </div>
    </div>
  );
}

export default Categorybar;
