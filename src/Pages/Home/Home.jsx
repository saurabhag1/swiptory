import React from "react";
import style from "./Home.module.css";
import TopNavbar from "../../Components/TopNavbar/TopNavbar";
import Categorybar from "../../Components/Categorybar/Categorybar";
import Story from "../../Components/Story/Story";
function Home() {
  return (
    <div>
      <TopNavbar />
      <Categorybar/>
      <Story/>
    </div>
  );
}

export default Home;
