import React, { useState } from "react";
import Keyboard from "./Keyboard";
import { getData, updateLetter } from "../data/db";
import "../styles/configarea.css";

function ConfigArea({ isAutoComplete, setAutoComplete }) {
  const [auto, setAuto] = useState(isAutoComplete);

  //KEYBOARD HANDLERS
  const [wholeData, setWholeData] = useState(getData);
  const [enteredValue, setEnteredValue] = useState([]);
  const [clickedButtonRef, setClickedButtonRef] = useState();

  function handleConfig() {
    fetch("http://127.0.0.1:8000/saver/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        letters: enteredValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Configuration Scuccessful!");
      })
      .catch((err) => {
        alert("There was an error configuring the keyboard!");
      });
  }


  const handleSubmit = (e) => {
    const recent_key = e.target.innerHTML;
    if (
      recent_key === "Ctrl" ||
      recent_key === "Alt" ||
      recent_key === "Shift_l" ||
      recent_key === "Shift_r" ||
      recent_key === "Win" ||
      recent_key === "Fn" ||
      recent_key === "CapsLock" ||
      recent_key === "Tab" ||
      recent_key === "Enter"
    ) {
      return;
    }

    wholeData.map((item, index) => {
      if (item.text === recent_key) {
        if (recent_key === "Backspace") {
          setClickedButtonRef(e.target.innerHTML);
          const valueDeleted = enteredValue.pop();
          wholeData.map((item) =>
            item.text === valueDeleted ? upDateProcess(item) : item
          );
          setEnteredValue(enteredValue);
          return null;
        }
        if (recent_key === " ") {
          setClickedButtonRef(e.target.innerHTML);
          upDateProcess(item);
          setEnteredValue((prevKey) => [...prevKey, e.target.innerHTML]);
          setClickedButtonRef(e.target.innerHTML);
          return null;
        }

        if (enteredValue.includes(recent_key)) {
          const index = enteredValue.indexOf(recent_key);
          enteredValue.splice(index, 1);
          setEnteredValue(enteredValue);
          upDateProcess(item);
          return null;
        }

        upDateProcess(item);
        setEnteredValue((prevKey) => [...prevKey, e.target.innerHTML]);
        setClickedButtonRef(e.target.innerHTML);
      }
      return null;
    });
  };

  return (
    <>
      <Keyboard
        wholeData={wholeData}
        firstRow={wholeData.slice(0, 14)}
        secondRow={wholeData.slice(14, 28)}
        thirdRow={wholeData.slice(28, 41)}
        fourthRow={wholeData.slice(41, 55)}
        handleSubmit={handleSubmit}
        enteredValue={enteredValue}
        clickedButtonRef={clickedButtonRef}
      />
      
      <input
        type="checkbox"
        id="auto"
        name="auto"
        checked={auto}
        onChange={() => {
          setAuto(!auto);
          setAutoComplete(!auto);
        }}
      />
      AutoCorrect
      <br />
      <button className="configButton" onClick={handleConfig}>Config</button>
    </>
  );
}

export default ConfigArea;