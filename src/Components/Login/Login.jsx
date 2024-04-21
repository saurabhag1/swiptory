import React from "react";
import style from "./Login.module.css";
import { useState, useContext } from "react";
import closeicon from "../../assets/closeicon.png";
import eyeicon from "../../assets/eyeicon.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllContext from "../../Context/Context";
function Login() {
  const [passwordshown, setpasswordshown] = useState(false);
  const [user, setuser] = useState({ name: "", password: "" });
  const [error, seterror] = useState("");
  const { onclicklogin } = useContext(AllContext);
  const togglepassword = () => {
    setpasswordshown(!passwordshown);
  };
  const handlesubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BACKENDURL}/login`, user)
      .then((res) => {
        if (res.data.token) {
          toast.success("Logedin Successfully", {
            autoClose: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            onclicklogin();
            window.location.reload();
          }, 2000);
          seterror("");
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.username);
        localStorage.setItem("userid", res.data.userid);
      })
      .catch((err) => {
        seterror(err.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className={style.overlay} onClick={onclicklogin}></div>
      <div className={style.modelcontent}>
        <div className={style.modelinnercontent}>
          <h3>Login to SwipTory</h3>
          <div className={style.logindetails}>
            <div>
              <img
                src={closeicon}
                className={style.closeicon}
                alt="close icon"
                onClick={onclicklogin}
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
                value={user.password}
                id="password"
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
            <button className={style.loginbutton} onClick={handlesubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
