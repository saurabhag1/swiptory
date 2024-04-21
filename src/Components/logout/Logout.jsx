import React, { useState } from "react";
import style from "./Logout.module.css";
function Logout({onmenuclick}) {
const [username,setusername]=useState(localStorage.getItem('name'))
const handlelogout=()=>{
  localStorage.clear()
  window.location.reload()
}
  return (
    <div className={style.logoutbox}>
      <div className={style.overlay} onClick={onmenuclick}></div>
      <div className={style.logoutdetails}>
        <div className={style.usernamebox}><p className={style.username}>{username}</p></div>
        
        <button className={style.logoutbutton} onClick={handlelogout}>Logout</button>
      </div>
    </div>
  );
}

export default Logout;
