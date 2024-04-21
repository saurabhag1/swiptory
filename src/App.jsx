import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import Bookmark from "./Pages/Bookmark/Bookmark";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./Context/Context";
import { useMediaQuery } from "react-responsive";
import MobileHome from "./Pages/MobileHome/MobileHome";
import Mobileyourstory from "./Pages/Mobileyourstory/Mobileyourstory";
function App() {
  const [count, setCount] = useState(0);
  const isMobile = useMediaQuery({
    minWidth: 300,
    maxWidth: 600,
  });

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          {isMobile ? (
            <>
              <Route path="/*" element={<MobileHome />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/yourstory" element={<Mobileyourstory />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Home />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/yourstory" element={<Mobileyourstory />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
