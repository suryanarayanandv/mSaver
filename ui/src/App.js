import React, { useState } from "react";
import Overlay from "./components/Overlay.jsx";
import TextArea from "./components/TextArea.jsx";

import "./styles/app.css";

function App() {
  const [auto, setAuto] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <div className="navbar">
          <img src='/msaver.ico' alt="logo" className="logo" />
          <h1 className="title">MSaver</h1>
      </div>

      <div className="config">
        <button className="config-btn" onClick={() => setOpen(!open)}>
          Setup Missing Words!
        </button>
      </div>

      <div clasName="config-area">
        <Overlay
          open={open}
          close={() => setOpen(!open)}
          auto={auto}
          setauto={setAuto}
        />
      </div>

      <div className="container">
        <TextArea auto={auto} />
      </div>
    </div>
  );
}

export default App;
