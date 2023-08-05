import React, { useEffect } from "react";
import ClipboardJS from "clipboard";
import "../styles/result.css";

const Result = ({ value }) => {
  useEffect(() => {
    new ClipboardJS(".result");
  });

  return (
    <div className="result-container">
      <button className="result" data-clipboard-text={value}>
        Copy
      </button>
      <span className="tooltip">Copied!</span>
    </div>
  );
};

export default Result;
