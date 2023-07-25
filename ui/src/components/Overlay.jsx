import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import ConfigArea from "./ConfigArea";
import "../styles/overlay.css";

const Overlay = ({ open, close, auto, setauto, children }) => {
  if (!open) return null;

  // keypress listener on the whole component
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [close]);

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="config-area">
        <button className="close-btn" onClick={() => close()}>
          X
        </button>
        <ConfigArea
          isAutoComplete={auto}
          setAutoComplete={setauto}
          close={close}
        />
      </div>
    </>,
    document.getElementById("config")
  );
};

export default Overlay;
