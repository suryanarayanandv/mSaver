import React, { useState } from "react";
import Keyboard from "./Keyboard";
import { getData, updateLetter } from "../data/db";
import "../styles/configarea.css";

function ConfigArea({ isAutoComplete, setAutoComplete, close }) {
  const [auto, setAuto] = useState(isAutoComplete);

  //KEYBOARD HANDLERS
  const [wholeData, setWholeData] = useState(getData);
  const [enteredValue, setEnteredValue] = useState([]);
  const [clickedButtonRef, setClickedButtonRef] = useState();

  function handleConfig() {
    // if entered value is empty
    if (enteredValue.length === 0) {
      alert("Please enter the letters");
      return;
    }

    fetch("http://127.0.0.1:8000/saver/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        letters: enteredValue,
      }),
    })
    // check if the response is ok
    .then((res) => {
      if (!res.ok) {
        alert("Error: " + res.status + " " + res.statusText);
      }
      close();
      alert("Configured Successfully");
    })
  }

  const upDateProcess=(item)=>{
    const toBeUpdated = !item.active;
    const updatedData=updateLetter(item.id,toBeUpdated);
    console.log("updated",updatedData);
    setWholeData(updatedData);
  }

  const handleSubmit = (e) => {
    const recent_key = (e.target.innerHTML).toLowerCase();
    if (
      recent_key === "ctrl" ||
      recent_key === "alt" ||
      recent_key === "shift_l" ||
      recent_key === "shift_r" ||
      recent_key === "win" ||
      recent_key === "fn" ||
      recent_key === "capslock" ||
      recent_key === "tab" ||
      recent_key === "enter"
    ) {
      return;
    }

    wholeData.map((item, index) => {
      if ((item.text).toLowerCase() === recent_key) {
        if (recent_key === "backspace") {
          setClickedButtonRef(e.target.innerHTML);
          const valueDeleted = enteredValue.pop();
                  
          wholeData.map((item) =>
            (item.text).toLowerCase() === valueDeleted ? upDateProcess(item) : item
          );
          setEnteredValue(enteredValue);
          return null;
        }
        if (recent_key === " ") {
          setClickedButtonRef(recent_key);
          upDateProcess(item);
          setEnteredValue((prevKey) => [...prevKey, recent_key]);
          setClickedButtonRef(recent_key);
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
        setEnteredValue((prevKey) => [...prevKey, recent_key]);
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

      <div className="auto-complete-pane">
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
        <button className="configButton" onClick={handleConfig}>
          Config
        </button>
      </div>
    </>
  );
}

export default ConfigArea;