import React from "react";
import style from "./MobileNavbar.module.css";
import { useState, useContext } from "react";

import menu from "../../assets/menu.png";

import Mobilelogout from "../Mobilelogout/Mobilelogout";
import AllContext from "../../Context/Context";
;
import { useNavigate } from "react-router-dom";
function MobileNavbar() {
  const [showregister, setshowregister] = useState(false);
  const [showlogout, setshowlogout] = useState(false);
  const [showaddjob, setshowaddjob] = useState(false);
  const navigate = useNavigate();
  const {
    loggedin,
    setloggedin,
    showlogin,
    setshowlogin,
    onclicklogin,
  } = useContext(AllContext);

  const onmenuclick = () => {
    setshowlogout(!showlogout);
  };

  const onclickregister = () => {
    setshowregister(!showregister);
  };
  const onclickaddjob = () => {
    setshowaddjob(!showaddjob);
  };

  return (
    <div className={style.navbar}>
      <h2 className={style.heading} onClick={() => navigate("/")}>
        SwipTory
      </h2>

      <div>
        <img
          className={style.sidemenu}
          src={menu}
          alt="menu"
          onClick={onmenuclick}
        />
      </div>
     
      {showregister ? <Register onclickregister={onclickregister} /> : ""}
      {showlogout ? <Mobilelogout onmenuclick={onmenuclick} /> : ""}
      {showaddjob ? <Addjob onclickaddjob={onclickaddjob} /> : ""}
    </div>
  );
}

export default MobileNavbar;
