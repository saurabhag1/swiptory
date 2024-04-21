import React, { useEffect, useState } from "react";
import style from "./Story.module.css";
import { useLocation } from "react-router-dom";
import AllContext from "../../Context/Context";
import { useContext } from "react";
import axios from "axios";
import edit from "../../assets/edit.png";
import Editjob from "../Editjob/Editjob";
import Storymodal from "../Storymodal/Storymodal";
import Slide from "../Slide/Slide";
import { useMediaQuery } from "react-responsive";
function Story() {
  const isMobile = useMediaQuery({
    minWidth: 300,
    maxWidth: 600,
  });

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
  const [category, setcategory] = useState("");
  const [story, setstory] = useState("");
  const [maxstory, setmaxstory] = useState(4);
  const [seemore, setseemore] = useState(false);
  const [categorydata, setcategorydata] = useState([]);

  const [showedit, setshowedit] = useState(false);
  const [showStory, setshowStory] = useState(false);
  const [showslide, setshowslide] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const id = params.get("id");
  const slide = params.get("slide");

  const [allmax, setallmax] = useState({
    User: 4,
    Food: 4,
    Travel: 4,
    Health: 4,
    Movies: 4,
    Education: 4,
  });
  const [allcategory, setallcategory] = useState({
    Food: "",
    Travel: "",
    Health: "",
    Movies: "",
    Education: "",
  });
  const categories = [
    "Food",
    "Health & Fitness",
    "Education",
    "Travel",
    "Movies",
  ];
  console.log(active);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKENDURL}/filter/${active}`)
      .then((res) => {
        console.log(res.data.posts);
        console.log(res.data);
        setcategory(res.data);
        setstory(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [active]);

  useEffect(() => {
    if (Array.isArray(story) && story.length > 0) {
      const mystory = story.map((post) => {
        const filtered = post.slides.filter(
          (slide) => slide.category === active
        );
        return filtered;
      });
      console.log(mystory);
      const allslides = story.reduce((acc, val) => {
        const everyslide = acc.concat(val.slides);
        return everyslide;
      }, []);
      const Food = allslides.filter((slides) => slides.category === "Food");
      const Travel = allslides.filter((slides) => slides.category === "Travel");
      const Health = allslides.filter(
        (slides) => slides.category === "Health & Fitness"
      );
      const Movies = allslides.filter((slides) => slides.category === "Movies");
      const Education = allslides.filter(
        (slides) => slides.category === "Education"
      );
      setallcategory({
        ...allcategory,
        Food: Food,
        Travel: Travel,
        Health: Health,
        Movies: Movies,
        Education: Education,
      });
      console.log(allcategory);
      const flattened = mystory?.reduce((acc, val) => acc.concat(val), []);

      console.log(flattened);
      setcategorydata(flattened);
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
  }, [active, story]);

  if (categorydata) {
    console.log(categorydata);
  }
  const handleseemore = () => {
    setmaxstory(Infinity);
  };
  const handleseeless = () => {
    setmaxstory(4);
  };

  const handleallseemore = (data) => {
    setallmax({ ...allmax, [data]: Infinity });
  };
  const handleallseeless = (data) => {
    setallmax({ ...allmax, [data]: 4 });
  };
  const onclickedit = () => {
    setshowedit(!showedit);
  };
  const onclickstory = () => {
    setshowStory(!showStory);
  };
  const handleEditpost = (data) => {
    setshowedit(!showedit);
    setpostid(data);
  };

  const handleStory = (data, index) => {
    setshowStory(!showStory);
    setslidedata(data);
    setcurrentindex(index);
  };

  if (slidedata) {
    console.log(slidedata);
    console.log(currentindex);
  }
  useEffect(() => {
    if (slide) {
      axios
        .get(`${import.meta.env.VITE_BACKENDURL}/slide/${id}`)
        .then((res) => {
          setslidedata(res.data);
          setshareData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slide]);
  console.log(shareData);
  return (
    <div className={style.Story}>
      {showedit ? <Editjob onclickedit={onclickedit} /> : ""}
      {showStory ? <Storymodal onclickstory={onclickstory} /> : ""}
      {slide && <Slide />}

      {active === "All" ? (
        <div>
          <div>
            {UserStory.length > 0 && loggedin && !isMobile && (
              <div>
                <div>
                  <h2 className={style.YourStory}>Your Stories</h2>{" "}
                  <div className={style.TopStoriesFood}>
                    {UserStory.length > 0 &&
                      Array.isArray(UserStory) &&
                      UserStory.slice(0, allmax.User).map((slide, index) => (
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
                      <div className={style.nostories}>
                        No Stories Available{" "}
                      </div>
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
            )}
          </div>
          <div>
            <h2 className={style.Mainheading}>Top Stories About Food</h2>{" "}
            <div className={style.TopStoriesFood}>
              {allcategory.Food.length > 0 &&
                allcategory.Food.slice(0, allmax.Food).map((Food, index) => (
                  <div
                    className={style.story}
                    key={index}
                    onClick={() => handleStory(allcategory.Food, index)}
                  >
                    <img src={Food.imageUrl} alt="storyimage" />
                    <div className={style.storyheading}>
                      <h2>{Food.heading}</h2>
                      <h4>{Food.description}</h4>
                    </div>
                  </div>
                ))}
              {allcategory.Food.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.Food === 4) & (allcategory.Food.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("Food")}
              >
                See more
              </button>
            ) : allmax.Food > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("Food")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <h2 className={style.Mainheading}>Top Stories About Travel</h2>{" "}
            <div className={style.TopStoriesFood}>
              {allcategory.Travel.length > 0 &&
                allcategory.Travel.slice(0, allmax.Travel).map(
                  (slide, index) => (
                    <div
                      className={style.story}
                      key={index}
                      onClick={() => handleStory(allcategory.Travel, index)}
                    >
                      <img src={slide.imageUrl} alt="storyimage" />
                      <div className={style.storyheading}>
                        <h2>{slide.heading}</h2>
                        <h4>{slide.description}</h4>
                      </div>
                    </div>
                  )
                )}
              {allcategory.Travel.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.Travel === 4) & (allcategory.Travel.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("Travel")}
              >
                See more
              </button>
            ) : allmax.Travel > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("Travel")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <h2 className={style.Mainheading}>
              Top Stories About Health & Fitness
            </h2>{" "}
            <div className={style.TopStoriesFood}>
              {allcategory.Health.length > 0 &&
                allcategory.Health.slice(0, allmax.Health).map(
                  (Food, index) => (
                    <div
                      className={style.story}
                      key={index}
                      onClick={() => handleStory(allcategory.Health, index)}
                    >
                      <img src={Food.imageUrl} alt="storyimage" />
                      <div className={style.storyheading}>
                        <h2>{Food.heading}</h2>
                        <h4>{Food.description}</h4>
                      </div>
                    </div>
                  )
                )}
              {allcategory.Health.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.Health === 4) & (allcategory.Health.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("Health")}
              >
                See more
              </button>
            ) : allmax.Health > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("Health")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <h2 className={style.Mainheading}>Top Stories About Education</h2>{" "}
            <div className={style.TopStoriesFood}>
              {allcategory.Education.length > 0 &&
                allcategory.Education.slice(0, allmax.Education).map(
                  (Food, index) => (
                    <div
                      className={style.story}
                      key={index}
                      onClick={() => handleStory(allcategory.Education, index)}
                    >
                      <img src={Food.imageUrl} alt="storyimage" />
                      <div className={style.storyheading}>
                        <h2>{Food.heading}</h2>
                        <h4>{Food.description}</h4>
                      </div>
                    </div>
                  )
                )}
              {allcategory.Education.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.Education === 4) & (allcategory.Education.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("Education")}
              >
                See more
              </button>
            ) : allmax.Education > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("Education")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <h2 className={style.Mainheading}>Top Stories About Movies</h2>{" "}
            <div className={style.TopStoriesFood}>
              {allcategory.Movies.length > 0 &&
                allcategory.Movies.slice(0, allmax.Movies).map(
                  (Food, index) => (
                    <div
                      className={style.story}
                      key={index}
                      onClick={() => handleStory(allcategory.Movies, index)}
                    >
                      <img src={Food.imageUrl} alt="storyimage" />
                      <div className={style.storyheading}>
                        <h2>{Food.heading}</h2>
                        <h4>{Food.description}</h4>
                      </div>
                    </div>
                  )
                )}
              {allcategory.Movies.length === 0 && (
                <div className={style.nostories}>No Stories Available </div>
              )}
            </div>
            {(allmax.Movies === 4) & (allcategory.Movies.length > 4) ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseemore("Movies")}
              >
                See more
              </button>
            ) : allmax.Movies > 4 ? (
              <button
                className={style.seemorebutton}
                onClick={() => handleallseeless("Movies")}
              >
                See less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className={style.Mainheading}>Top Stories About {active}</h2>{" "}
          <div className={style.TopStoriesFood}>
            {Array.isArray(categorydata) &&
              categorydata.length > 0 &&
              categorydata.slice(0, maxstory).map((slide, index) => (
                <div
                  className={style.story}
                  key={index}
                  onClick={() => handleStory(categorydata, index)}
                >
                  <img src={slide.imageUrl} alt="storyimage" />
                  <div className={style.storyheading}>
                    <h2>{slide.heading}</h2>
                    <h4>{slide.description}</h4>
                  </div>
                </div>
              ))}
            {categorydata.length === 0 && (
              <div className={style.nostories}>No Stories Available </div>
            )}
          </div>
          {(maxstory === 4) & (categorydata.length > 4) ? (
            <button
              className={style.seemorebutton}
              onClick={() => handleseemore()}
            >
              See more
            </button>
          ) : categorydata.length < 4 ? (
            ""
          ) : (
            <button
              className={style.seemorebutton}
              onClick={() => handleseeless()}
            >
              See less
            </button>
          )}
        </div>
      )}
      {/* <div>
        <div>
          <h2 className={style.Mainheading}>Top Stories About Food</h2>
          <div className={style.TopStoriesFood}>
            <div className={style.story}>
              <img
                src="https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D"
                alt="storyimage"
              />
              <div className={style.storyheading}>
                <h2>Heading</h2>
                <h4>
                  hello this is beauti of oman in heats ajsdnjkasdn
                  jknkjnsajnkjdn
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* (
        <>
          {categories.map((category1) => (
            <div key={category1}>
              <h2 className={style.Mainheading}>
                Top Stories About {category1}
              </h2>
              <div className={style.TopStoriesFood}>
                {story.length > 0 &&
                  story.map((post) => {
                    const slideCategory = post.slides.filter((slide) => {
                      slide.category === category1;
                    });
                    return (
                      <>
                        {slideCategory
                          .slice(0, displayedStories[category1] || 4)
                          .map((slide, index) => (
                            <div className={style.story} key={index}>
                              <img src={slide.imageUrl} alt="storyimage" />
                              <div className={style.storyheading}>
                                <h2>{slide.heading}</h2>
                                <h4>{slide.description}</h4>
                              </div>
                            </div>
                          ))}
                      </>
                    );
                  })}
              </div>
            </div>
          ))}
        </>
      ) */}

      {/* {active === "All" ? (
        ""
      ) : (
        <div>
          <h2 className={style.Mainheading}>Top Stories About {active}</h2>{" "}
          <div className={style.TopStoriesFood}>
            {story.length > 0 &&
              story.map((post) => {
                const slideCategory = post.slides.filter(
                  (slide) => slide.category === active
                );

                return (
                  <>
                    {slideCategory.length > 0 &&
                      slideCategory.map((slide) => (
                        <div className={style.story}>
                          <img src={slide.imageUrl} alt="storyimage" />
                          <div className={style.storyheading}>
                            <h2>{slide.heading}</h2>
                            <h4>{slide.description}</h4>
                          </div>
                        </div>
                      ))}
                  </>
                );
              })}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Story;
