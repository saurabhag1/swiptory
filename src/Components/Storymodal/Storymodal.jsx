import React, { useContext, useEffect, useState } from "react";
import style from "./Storymodal.module.css";
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
import { useMediaQuery } from "react-responsive";

function Storymodal({ onclickstory }) {
  const isMobile = useMediaQuery({
    minWidth: 300,
    maxWidth: 600,
  });

  const {
    slidedata,
    currentindex,
    setcurrentindex,
    loggedin,
    onclicklogin,
    showlogin,
  } = useContext(AllContext);
  const [slideInfo, setslideInfo] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [isbookmarked, setisbookmarked] = useState(false);

  const handlecloselogin = () => {
    setshowLogin(!showLogin);
  };

  const handlenext = () => {
    setcurrentindex((previousindex) => (previousindex + 1) % slidedata.length);
    axios
      .get(
        `${import.meta.env.VITE_BACKENDURL}/slide/${
          slidedata[currentindex]._id
        }`
      )
      .then((res) => {
        setslideInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleprevious = () => {
    setcurrentindex(
      (prevIndex) => (prevIndex - 1 + slidedata.length) % slidedata.length
    );
    axios
      .get(
        `${import.meta.env.VITE_BACKENDURL}/slide/${
          slidedata[currentindex]._id
        }`
      )
      .then((res) => {
        setslideInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (slidedata.length > 0) {
      axios
        .get(
          `${import.meta.env.VITE_BACKENDURL}/slide/${
            slidedata[currentindex]._id
          }`
        )
        .then((res) => {
          setslideInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slidedata, currentindex]);
  console.log(loggedin);

  const handlelike = () => {
    if (loggedin) {
      axios
        .put(
          `${import.meta.env.VITE_BACKENDURL}/slide/likes/${
            slidedata[currentindex]._id
          }`,
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
            `${import.meta.env.VITE_BACKENDURL}/slide/${
              slidedata[currentindex]._id
            }`
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
  }, [slideInfo, currentindex]);

  const handleBookmark = () => {
    if (loggedin) {
      axios
        .post(
          `${import.meta.env.VITE_BACKENDURL}/bookmarks/${
            slidedata[currentindex]._id
          }`,
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
          setisbookmarked(
            userInfo.bookmarks.includes(slidedata[currentindex]._id)
          );
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
      slidedata[currentindex]._id
    }`;
    navigator.clipboard
      .writeText(link)
      .then((res) => {
        toast.success("Link copied to clipborad", {
          autoClose: 1000,
          position: "top-left",
          pauseOnHover: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userInfo && userInfo.bookmarks) {
      setisbookmarked(userInfo.bookmarks.includes(slidedata[currentindex]._id));
    }
    console.log(userInfo);
  }, [userInfo, currentindex]);

  return (
    <div>
      {showlogin && <Login handlecloselogin={handlecloselogin} />}
      <div className={style.overlay}>
        <img
          src={previous}
          className={style.previous}
          alt="previous"
          onClick={handleprevious}
        />
        <img
          src={next}
          className={style.next}
          alt="next"
          onClick={handlenext}
        />
      </div>

      <div className={style.modelcontent}>
        <ToastContainer />{" "}
        <div>
          <div className={style.story}>
            {slidedata && slidedata.length > 0 && (
              <img src={slidedata[currentindex].imageUrl} alt="story" />
            )}
            {isMobile ? (
              <>
                <div className={style.right} onClick={handlenext}></div>
                <div className={style.left} onClick={handleprevious}></div>
              </>
            ) : (
              ""
            )}

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
                onClick={onclickstory}
              />
              {slideInfo && slideInfo.likes && (
                <p className={style.likecount}>{slideInfo.likes.length}</p>
              )}
            </div>
            <div className={style.storyheading}>
              <h2>{slidedata[currentindex].heading}</h2>
              <h4>{slidedata[currentindex].description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storymodal;
