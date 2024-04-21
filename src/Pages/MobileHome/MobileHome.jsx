import React from "react";
import style from "./MobileHome.module.css";
import MobileNavbar from "../../MobileComponents/MobileNavbar/MobileNavbar";
import Categorybar from "../../Components/Categorybar/Categorybar";
import Story from "../../Components/Story/Story";
function MobileHome() {
  return (
    <div>
      <MobileNavbar/>
      <Categorybar/>
      <Story/>
    </div>
  );
}

export default MobileHome;
