import React from "react";
import style from "./TopNavbar.module.css";
import { useState, useContext } from "react";
import bookmarks from "../../assets/bookmarks.png";
import profilephoto from "../../assets/profilephoto.svg";
import menu from "../../assets/menu.png";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../logout/Logout";
import AllContext from "../../Context/Context";
import Addjob from "../Addjob/Addjob";
import { useNavigate } from "react-router-dom";
function TopNavbar() {
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
        {!loggedin ? (
          <div className={style.buttons}>
            <button className={style.Registerbutton} onClick={onclickregister}>
              Register Now
            </button>
            <button className={style.Loginbutton} onClick={onclicklogin}>
              Login
            </button>
          </div>
        ) : (
          <div className={style.afterlogginbutton}>
            <button className={style.Bookmarkbutton} onClick={()=>navigate('bookmark')}>
              <img src={bookmarks} alt="bookmark" />
              <p>Bookmarks</p>
            </button>
            <button className={style.Addstorybutton} onClick={onclickaddjob}>
              Add Story
            </button>
            <img src={profilephoto} alt="profile pic" />
            <img
              className={style.sidemenu}
              src={menu}
              alt="menu"
              onClick={onmenuclick}
            />
          </div>
        )}
      </div>
      {showlogin ? <Login /> : ""}
      {showregister ? <Register onclickregister={onclickregister} /> : ""}
      {showlogout ? <Logout onmenuclick={onmenuclick} /> : ""}
      {showaddjob ? <Addjob onclickaddjob={onclickaddjob} /> : ""}
    </div>
  );
}

export default TopNavbar;
