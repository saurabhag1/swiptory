import React, { useContext, useEffect, useState } from "react";
import style from "./Slide.module.css";
import like from "../../assets/liked.png";
import unlike from "../../assets/unliked.png";
import share from "../../assets/share.png";
import bookmark from "../../assets/bookmark.png";
import bookmarked from "../../assets/bookmarked.png";
import next from "../../assets/next.png";
import previous from "../../assets/previous.png";
import close from "../../assets/close.png";
import AllContext from "../../Context/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../Login/Login";
import { useNavigate } from "react-router-dom";

function Slide() {
  const {
    currentindex,
    setcurrentindex,
    loggedin,
    onclicklogin,
    showlogin,
    shareData,
    setshareData,
  } = useContext(AllContext);
  const [slideInfo, setslideInfo] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [isbookmarked, setisbookmarked] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDURL}/slide/${shareData._id}`)
      .then((res) => {
        setslideInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shareData]);

  const handlelike = () => {
    if (loggedin) {
      axios
        .put(
          `${import.meta.env.VITE_BACKENDURL}/slide/likes/${shareData._id}`,
          {},
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (res) => {
          console.log(res.data);
          const updatedSlide = await axios.get(
            `${import.meta.env.VITE_BACKENDURL}/slide/${shareData._id}`
          );
          setslideInfo(updatedSlide.data);
          setIsLiked(slideInfo.likes.includes(localStorage.getItem("userid")));
        })
        .catch((err) => {
          console.log(err);
          setshowLogin(!showLogin);
        });
    } else {
      onclicklogin();
    }
  };

  useEffect(() => {
    if (slideInfo && slideInfo.likes) {
      setIsLiked(slideInfo.likes.includes(localStorage.getItem("userid")));
    }
  }, [slideInfo]);

  const handleBookmark = () => {
    if (loggedin) {
      axios
        .post(
          `${import.meta.env.VITE_BACKENDURL}/bookmarks/${shareData._id}`,
          {},
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (res) => {
          console.log(res.data);
          const updateduser = await axios.get(
            `${import.meta.env.VITE_BACKENDURL}/user/${localStorage.getItem(
              "userid"
            )}`
          );
          setuserInfo(updateduser.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      onclicklogin();
    }
  };

  const handleshare = () => {
    const link = `${import.meta.env.VITE_FRONTENDURL}/?slide=true&id=${
      shareData._id
    }`;
    navigator.clipboard
      .writeText(link)
      .then((res) => {
        console.log("Copied to clipborad");
        toast.success("Link Copied to Clipborad", {
          autoClose: 2000,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userInfo && userInfo.bookmarks) {
      setisbookmarked(userInfo.bookmarks.includes(shareData._id));
    }
    console.log(userInfo);
  }, [userInfo, currentindex]);

  return (
    <div>
      {showlogin && <Login />}
      <div className={style.overlay}>
        <ToastContainer />{" "}
      </div>

      <div className={style.modelcontent}>
        <div>
          <div className={style.story}>
            {shareData && <img src={shareData.imageUrl} alt="story" />}

            <div>
              <img
                src={share}
                className={style.share}
                alt="share"
                onClick={handleshare}
              />
              <img
                src={isLiked ? like : unlike}
                className={`${isLiked ? style.like : style.unlike}`}
                alt="like"
                onClick={handlelike}
              />
              <img
                src={isbookmarked ? bookmarked : bookmark}
                className={style.bookmark}
                alt="bookmark"
                onClick={handleBookmark}
              />
              <img
                src={close}
                className={style.close}
                alt="close"
                onClick={() => {
                  navigate("/");
                }}
              />
              {slideInfo && slideInfo.likes && (
                <p className={style.likecount}>{slideInfo.likes.length}</p>
              )}
            </div>
            <div className={style.storyheading}>
              <h2>{shareData.heading}</h2>
              <h4>{shareData.description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
