import React, { useState, useContext } from "react";
import style from "./Mobilelogout.module.css";
import profilephoto from "../../assets/profilephoto.svg";
import AllContext from "../../Context/Context";
import bookmarks from "../../assets/bookmarks.png";
import { useNavigate } from "react-router-dom";
import Login from "../../Components/Login/Login";
import Addjob from "../../Components/Addjob/Addjob";
import Register from "../../Components/Register/Register";
function Mobilelogout({ onmenuclick }) {
  const [username, setusername] = useState(localStorage.getItem("name"));
  const {
    loggedin,
    setloggedin,
    showlogin,
    setshowlogin,
    onclicklogin,
  } = useContext(AllContext);
  const handlelogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [showregister, setshowregister] = useState(false);
  const [showaddjob, setshowaddjob] = useState(false);
  const navigate = useNavigate();

  const onclickregister = () => {
    setshowregister(!showregister);
  };
  const onclickaddjob = () => {
    setshowaddjob(!showaddjob);
  };

  return (
    <div className={style.logoutbox}>
      <div className={style.overlay} onClick={onmenuclick}></div>
      <div className={style.logoutdetails}>
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
            <div className={style.usernamebox}>
              <img src={profilephoto} alt="profile pic" />
              <p className={style.username}>{username}</p>
            </div>
            <button
              className={style.Addstorybutton}
              onClick={() => navigate("/yourstory")}
            >
              Your Story
            </button>

            <button
              className={style.Bookmarkbutton}
              onClick={() => navigate("/bookmark")}
            >
              <img src={bookmarks} alt="bookmark" />
              <p>Bookmarks</p>
            </button>
            <button className={style.Addstorybutton} onClick={onclickaddjob}>
              Add Story
            </button>
            <button className={style.logoutbutton} onClick={handlelogout}>
              Logout
            </button>
          </div>
        )}
      </div>
      {showlogin ? <Login /> : ""}
      {showaddjob ? <Addjob onclickaddjob={onclickaddjob} /> : ""}
      {showregister ? <Register onclickregister={onclickregister} /> : ""}
    </div>
  );
}

export default Mobilelogout;
