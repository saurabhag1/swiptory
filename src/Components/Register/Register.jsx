import React from "react";
import style from "./Register.module.css";
import { useState, useContext } from "react";
import closeicon from "../../assets/closeicon.png";
import eyeicon from "../../assets/eyeicon.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register({ onclickregister }) {
  const [passwordshown, setpasswordshown] = useState(false);
  const [user, setuser] = useState({ name: "", password: "" });
  const [error, seterror] = useState("");
  const togglepassword = () => {
    setpasswordshown(!passwordshown);
  };

  const handleregister = () => {
    axios
      .post(`${import.meta.env.VITE_BACKENDURL}/register`, user)
      .then((res) => {
        console.log(res.data);
        toast.success("Registered Successfully", {
          autoClose: 2000,
          position: "top-center",
        });
        seterror("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("userid", res.data.userid);
        setTimeout(() => {
          onclickregister();
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        seterror(err.response.data.message);
      });
  };
  return (
    <>
      <div className={style.overlay} onClick={onclickregister}></div>
      <div className={style.modelcontent}>
        <div className={style.modelinnercontent}>
          <h3>Register to SwipTory</h3>
          <div className={style.logindetails}>
            <div>
              <img
                src={closeicon}
                className={style.closeicon}
                alt="close icon"
                onClick={onclickregister}
              />
            </div>
            <div>
              <label htmlFor="username"> Username</label>
              <input
                type="text"
                id="username"
                value={user.name}
                onInput={(e) => {
                  setuser({ ...user, name: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password"> Password</label>
              <input
                type={passwordshown ? "text" : "password"}
                id="password"
                value={user.password}
                onInput={(e) => {
                  setuser({ ...user, password: e.target.value });
                }}
              />
              <img
                src={eyeicon}
                alt="eyeicon"
                onClick={togglepassword}
                className={style.eyeicon}
              />
            </div>
            <p className={style.errormessage}>{error}</p>
            <button className={style.loginbutton} onClick={handleregister}>
              Register
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
