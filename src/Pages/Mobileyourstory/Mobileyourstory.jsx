import React, { useEffect, useState, useContext } from "react";
import TopNavbar from "../../Components/TopNavbar/TopNavbar";
import style from "./Mobileyourstory.module.css";
import AllContext from "../../Context/Context";
import axios from "axios";
import Storymodal from "../../Components/Storymodal/Storymodal";
import { useMediaQuery } from "react-responsive";
import MobileNavbar from "../../MobileComponents/MobileNavbar/MobileNavbar";
import edit from "../../assets/edit.png";
import Editjob from "../../Components/Editjob/Editjob";

function Mobileyourstory() {
  const [showStory, setshowStory] = useState(false);
  const [bookData, setbookData] = useState([]);
  const [allmax, setallmax] = useState(4);
  const [story, setstory] = useState([]);
  const [showedit, setshowedit] = useState(false);
  const {
    active,
    setactive,
    loggedin,
    postid,
    setpostid,
    slidedata,
    setslidedata,
    currentindex,
    setcurrentindex,
    shareData,
    setshareData,
    UserStory,
    setUserStory,
  } = useContext(AllContext);
  const isMobile = useMediaQuery({
    minWidth: 300,
    maxWidth: 600,
  });

  const handleseemore = () => {
    setallmax(Infinity);
  };

  const handleseeless = () => {
    setallmax(4);
  };
  const handleStory = (data, index) => {
    setshowStory(!showStory);
    setslidedata(data);
    setcurrentindex(index);
  };

  const onclickstory = () => {
    setshowStory(!showStory);
  };
  const onclickedit = () => {
    setshowedit(!showedit);
  };

  const handleEditpost = (data) => {
    setshowedit(!showedit);
    setpostid(data);
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDURL}/filter/All`)
      .then((res) => {
        console.log(res.data.posts);
        console.log(res.data);
        setstory(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (Array.isArray(story) && story.length > 0) {
      const UserPostedStory = story.filter(
        (slide) => slide.postedBy === localStorage.getItem("userid")
      );
      console.log(UserPostedStory);
      const allUserPostedStory = UserPostedStory.reduce((acc, val) => {
        const everyslide = acc.concat(val.slides);
        return everyslide;
      }, []);
      console.log(allUserPostedStory);
      setUserStory(UserPostedStory);
      console.log(UserPostedStory);
    }
  }, [story]);

  return (
    <>
      {showedit ? <Editjob onclickedit={onclickedit} /> : ""}
      {isMobile ? <MobileNavbar /> : <TopNavbar />}
      {showStory ? <Storymodal onclickstory={onclickstory} /> : ""}
      <div className={style.Story}>
        <div>
          <div>
            <h2 className={style.YourStory}>Your Stories</h2>{" "}
            <div className={style.TopStoriesFood}>
              {UserStory.length > 0 &&
                Array.isArray(UserStory) &&
                UserStory.slice(0, allmax).map((slide, index) => (
                  <div key={index}>
                    <div
                      className={style.story}
                      onClick={() => handleStory(slide.slides, 0)}
                    >
                      {slide.slides &&
                        slide.slides.length > 0 &&
                        slide.slides[0].imageUrl && (
                          <img
                            src={slide.slides[0].imageUrl}
                            alt="storyimage"
                          />
                        )}
                      <div className={style.storyheading}>
                        {slide.slides &&
                          slide.slides.length > 0 &&
                          slide.slides[0].heading && (
                            <h2>{slide.slides[0].heading}</h2>
                          )}
                        {slide.slides &&
                          slide.slides.length > 0 &&
                          slide.slides[0].description && (
                            <h4>{slide.slides[0].description} </h4>
                          )}
                      </div>
                    </div>
                    <button
                      className={style.editbutton}
                      onClick={() => handleEditpost(slide._id)}
                    >
                      <img src={edit} />
                      <p>Edit</p>
                    </button>
                  </div>
                ))}
              {UserStory.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.User === 4) & (UserStory.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("User")}
              >
                See more
              </button>
            ) : allmax.User > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("User")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mobileyourstory;
